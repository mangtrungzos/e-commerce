import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import { User } from '../../models/User';
import { generateAccessToken } from '../../utils/token/generateAccessToken';
import { generateRefreshToken } from '../../utils/token/generateRefreshToken';

// Login user
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Generate tokens
        const token = generateAccessToken({ id: user._id, email: user.email, role: user.role });
        const refreshToken = generateRefreshToken({ id: user._id,  email: user.email, role: user.role });

        // console.log(jwt.decode(refreshToken));
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: "strict" });

        // Return token and some basic user info
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });  // role: user.role
    }
    catch(error) {
        console.error("Error logging in user", error);
        next(error);
    }
}


// Register user
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        // Check email has been existed yet
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email has been existed" });
            return;
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    }
    catch(error) {
        next(error);
    }
}