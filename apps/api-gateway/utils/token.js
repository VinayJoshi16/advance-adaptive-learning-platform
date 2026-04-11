const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

exports.generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        ACCESS_SECRET,
        { expiresIn: "15m" }
    );

    const refreshId = uuidv4();

    const refreshToken = jwt.sign(
        { id: user._id, refreshId },
        REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken, refreshId };
};