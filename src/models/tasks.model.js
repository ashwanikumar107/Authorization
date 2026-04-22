import mongoose from "mongoose";

const task = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["pending", "in-progress", "completed"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required"]
    }
}, {
    timestamps: true,
})

const taskModel = mongoose.model("task", task);

export default taskModel;