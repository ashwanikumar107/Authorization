import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function IsLoggedIn(req, res, next) {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "Invalid token, No Authorization"
            })
        }
        
        try{
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded;
            console.log("The decoded user is: ", req.user);
            next();
        }catch(err){
            return res.status(401).json({
                message: "Token is not valid"
            })
        }

    }else{
        return res.status(401).json({
            message: "Invalid token"
        })
    } 
}