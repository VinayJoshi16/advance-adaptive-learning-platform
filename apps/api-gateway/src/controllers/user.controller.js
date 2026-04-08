const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // 1. Check if user already exists
        let user = await usermodel.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Create user (password will be hashed automatically by hook)
        user = await usermodel.create({
            name: username,
            email,
            password
        });

        // 3. Generate token using model method
        const token = user.generateAuthToken();

        // 4. Send response
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

