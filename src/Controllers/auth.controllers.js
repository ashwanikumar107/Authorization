import user from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

export async function register(req, res) {
    const { username, email, password, role} = req.body;

    const isAlreadyRegistered = await user.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(409).json({
            message: "User already registerd"
        })
    }

    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    const newuser = await user.create({
        username,
        email,        
        password: passwordHash,
        role
    })

    const refreshToken = jwt.sign({
        id: newuser._id,
    },config.JWT_SECRET, {
        expiresIn: "7d"
    })
    
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        user: newuser._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
    })

    const accessToken = jwt.sign({
        id: newuser._id,
        role: newuser.role,
        sessionId: session._id
    }, config.JWT_SECRET, {
        expiresIn: "15m"
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: "User Register Successfully",
        user: {
            username: newuser.username,
            email: newuser.email,
            role: newuser.role
        },
        accessToken
    })
}

export async function login(req, res) {
    const { email, password} = req.body;

    const userfind = await user.findOne({ email });

    if(!userfind){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    const checkPassword = passwordHash === userfind.password;

    if(!checkPassword){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const refreshToken = jwt.sign({
        id: userfind._id
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        user: userfind._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const accessToken = jwt.sign({
        id: userfind._id,
        role: userfind.role,
        sessionId: session._id,
    }, config.JWT_SECRET, {
        expiresIn: "15m"
    })

    res.status(200).json({
        message: "User Logged In Successfully",
        user: {
            username: userfind.username,
            email: userfind.email,
            role: userfind.role
        },
        accessToken
    })
}