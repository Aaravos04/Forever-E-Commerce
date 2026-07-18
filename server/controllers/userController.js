import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import createToken from '../utils/createToken.js';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password)
            return res.status(400).json({ success: false, message: "Please fill in all fields!" });
        
        const user = await User.findOne({ email });
        if(!user)
            return res.status(400).json({ success: false, message: "User does not exist!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({ success: false, message: "Incorrect password!" });

        const token = createToken(user._id);
        res.json({ success: true, message: "Logged in successfully!", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password)
            return res.status(400).json({ success: false, message: "Please fill in all fields!" });
        
        const existingUser = await User.findOne({ email });
        if(existingUser)
            return res.status(400).json({ success: false, message: "User already exists!" });

        if(!validator.isEmail(email))
            return res.status(400).json({ success: false, message: "Invalid email!" });
        if(password.length < 8)
            return res.status(400).json({ success: false, message: "Please enter a strong password" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, message: "User registered successfully!", token });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password)
            return res.status(400).json({ success: false, message: "Please fill in all fields!" });
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, message: "Logged in successfully!", token });
        }
        
        res.status(400).json({ success: false, message: "Incorrect credentials!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin };