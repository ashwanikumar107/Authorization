import mongoose from "mongoose";

const session = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user is required"],
    },
    refreshTokenHash: {
        type: String,
        required: [true, "Refresh Token is required"]
    },
    ip: {
        type: String,
        required: [true, "IP is required"]
    },
    userAgent: {
        type: String,
        required: [true, "User Agent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
});

const sessionModel = mongoose.model("session", session);

export default sessionModel;