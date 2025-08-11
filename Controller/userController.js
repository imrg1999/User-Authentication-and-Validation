import { userModel } from "../Model/userModel.js";
import { validationSchema } from "../Validation/zodValidation.js";
import { ZodError } from "zod";
import { hashing } from "../Validation/passwordHashing.js";

export const showAllUsers = async(req,res) => {
    try{
    const allUsers = await userModel.find();
    if(!allUsers || allUsers.length === 0) {
        return res.status(404).json({
            success : false,
            message: "users are not listed"
        })
    } else {
        return res.status(200).json({
            success : true,
            users : allUsers
        })
    }
 }catch(e) {
    return res.status(400).json({
            success : false,
            message: "users are not listed"
        })
    }
}

//Add New Users
export const addNewUsers = async(req,res) => {
    try{
        const validUser = validationSchema.parse(req.body);
        const hashPassword = await hashing(validUser.password);

        const newUser = await userModel.create({
            ...validUser,
            password: hashPassword
        });
        if(!newUser) {
            res.status(400).json({
                message: "Error"
            })
        } else {
            res.status(200).json({
                user: newUser
            })
        }
    } catch(e) {
        if(e instanceof ZodError) {
            res.status(400).json({
                status: false,
                message: "No new entry found",
                error: e.issues
            })
        } else {
            res.status(500).json({
                status: false,
                message: "Internal Server Error"
            })
        }
    }
}

//Search by id
export const findyUserBYId = async(req,res) => {
    try{
        const {id} = req.params;
        const userId = await userModel.findById(id);
        if(!userId) {
            res.status(500).json({
                status: false,
                message: "Id unavailable"
            })
        } else {
            res.status(200).json({
                user: userId
            })
        }
    }catch(e) {
        if(e instanceof ZodError) {
            res.status(500).json({
                status: false,
                error: e.issues
            })
        } else {
            res.status(500).json({
                status: false,
                message: "Internal Server Error"
            })
        }
    }
}