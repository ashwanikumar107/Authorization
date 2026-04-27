import taskModel from "../models/tasks.model.js";
import userSchema from "../models/user.model.js";

export async function canEditListing(req, res, next) {
    try{
        const { id } = req.params;
        const listing = await taskModel.findById(id);

        if(!listing){
            return res.status(404).json({
                message: "Listing Not Found"
            })
        }

        const LoggedInUserId = req.user.id;
        const LoggedInUserRole = req.user.role;

        if(LoggedInUserRole === "admin"){
            req.listing = listing;
            return next();
        }

        if(LoggedInUserRole === "user" && LoggedInUserId === listing.createdBy.toString()){
            req.listing = listing;
            return next();
        }

        return res.status(403).json({
            message : "You can't Edit the Listing"
        })

    } catch(err){
        return res.status(500).json({
            message: "Authorization Check Failed!",
            error : error.message
        })
    }
    
}