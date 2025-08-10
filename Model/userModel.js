import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name : String,
    email : String,
    age : Number,
    contact : String,
    password : String
});

export const userModel = model("UserDB",userSchema);