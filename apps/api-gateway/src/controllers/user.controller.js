const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const usermodel = require("../models/user.model");
const redisClient = require("../config/redis");

const REFRESH_TTL_SEC = 7 * 24 * 60 * 60;

function generateTokenPair(user) {
  const refreshId = crypto.randomUUID();
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, refreshId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" }
  );
  return { accessToken, refreshToken, refreshId };
}

async function storeRefreshSession(userId, refreshId) {
  await redisClient.set(`refresh:${userId}`, refreshId, { EX: REFRESH_TTL_SEC });
}

function authPayload(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

// register user
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await usermodel.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = await usermodel.create({
      name: username,
      email,
      password,
    });

    const { accessToken, refreshToken, refreshId } = generateTokenPair(user);
    await storeRefreshSession(user.id, refreshId);

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      token: accessToken,
      user: authPayload(user),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// login user
module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await usermodel.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken, refreshId } = generateTokenPair(user);
    await storeRefreshSession(user.id, refreshId);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      token: accessToken,
      user: authPayload(user),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// logout user — clears refresh session in Redis; client must drop tokens locally
module.exports.logoutUser = async (req, res) => {
  try {
    await redisClient.del(`refresh:${req.user.id}`);
  } catch (err) {
    console.error(err);
  }
  res.status(200).json({ message: "Logged out successfully" });
};

// refresh token — body: { refreshToken }
module.exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const storedId = await redisClient.get(`refresh:${decoded.id}`);

    if (!storedId || storedId !== decoded.refreshId) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = await usermodel.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
    );

    res.json({ accessToken: newAccessToken, token: newAccessToken });
  } catch {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
