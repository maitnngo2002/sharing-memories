import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => { 

    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(existingUser.password, password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Incorrect password"});
        }
        // get the JWT we need to send to the frontend
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: '1h'});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'An error occured'});
    }
}

export const signup = async (req, res) => { 
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email: email});
        if (existingUser) {
            res.status(400).json({ message: "User already exists"});
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords don't match"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({name: `${firstName} ${lastName}`, email: email, password: hashedPassword});
        
        const token = jwt.sign({email: newUser.email, id: newUser._id}, 'test', { expiresIn: '1h'});
        res.status(200).json({newUser, token});
    } catch (error) {
        res.status(500).json({message: 'An error occured'});
    }
}