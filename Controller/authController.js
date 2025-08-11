import { validationSchema } from "../Validation/zodValidation.js";
import { hashing } from "../Validation/passwordHashing.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../Model/userModel.js";
import { ZodError } from "zod";

export const register = async (req, res) => {
    try {
        // 1. Validate input
        const validatedData = validationSchema.parse(req.body);

        // 2. Check if email exists
        const existingUser = await userModel.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 3. Hash password
        const hashedPassword = await hashing(validatedData.password);

        // 4. Save user
        const newUser = new userModel({
            ...validatedData,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, email: newUser.email }
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues
            });
        }
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // To Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller/profileController.js

export const getProfile = async (req, res) => {
    try {
        // req.user was set in authMiddleware after verifying the token
        const userprofile = await userModel.findById(req.user.id).select("-password");

        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "Profile fetched successfully",
            user: userProfile
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
