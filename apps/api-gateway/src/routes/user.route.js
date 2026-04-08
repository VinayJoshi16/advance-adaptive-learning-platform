const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');  
const {body} = require('express-validator');


// Create a new user
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

module.exports = router;