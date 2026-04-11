const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');


// Create a new user
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

// User login
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], userController.loginUser);

// User logout (requires valid access token; client must still discard token locally)
router.post('/logout', authMiddleware, userController.logoutUser);

// refresh token endpoint (client sends refresh token, server verifies and issues new access token)
router.post('/refresh-token', userController.refreshToken);

module.exports = router;