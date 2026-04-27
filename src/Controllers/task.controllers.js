import taskModel from "../models/tasks.model.js";

export async function createTask(req, res) {
    try{
        const { title, description, status} = req.body;

        const newtask = await taskModel.create({
            title,
            description,
            status,
            createdBy: req.user.id
        })

        res.status(200).json({
            message: "Task created Successfully",
            task: {
                title: newtask.title,
                description: newtask.description,
                status: newtask.status
            }
        })
    }catch(err){
        return res.status(401).json({
            message: "Invalid data"
        })
    }
}

export async function readTask(req, res) {
    try{
        const findtask = await taskModel.findOne({ _id: req.params.id });

        if(!findtask){
            return res.status(404).json({
                message: "Can't find task"
            })
        }

        res.status(200).json({
            message: "Tasks is fetched successfully",
            task: {
                title: findtask.title,
                description: findtask.description,
                status: findtask.status
            }
        })
    }catch(err){
        return res.send(404).json({
            message: "Invalid task Id"
        })
    }
}

export async function updateTask(req, res){
    try{
        const findtask = await taskModel.findOne({
                _id: req.params.id,
            });

        if(!findtask){
            return res.status(404).json({
                message: "Can't find Task"
            })
        }
        const { title, description, status } = req.body;

        const updatetask = await taskModel.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                status
            },
            { new: true }
        )

        res.status(200).json({
            message: "Task Update Successfully",
            task: {
                title : updatetask.title,
                description: updatetask.description,
                status: updatetask.status
            }
        })
    }catch(err){
        return res.status(400).json({
            message: "Invalid task Id"
        })
    }
}

export async function deleteTask(req, res){
    try{
        const findtask = await taskModel.findOne({ _id : req.params.id });

        if(!findtask){
            return res.status(404).json({
                message: "Can't find task"
            })
        }

        const deletetask = await taskModel.findByIdAndDelete(
            req.params.id
        )

        return res.status(200).json({
            message: "Task Deleted Successfully"
        })
        
    }catch(err){
        return res.status(400).json({
            message: "Invalid task id"
        })
    }
}