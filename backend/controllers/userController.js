const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const generateToken = require("../config/generateToken");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const salt = await bcryptjs.genSaltSync(10);
  const hashedPassword = await bcryptjs.hashSync(password, salt);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, "30d"),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, "30d"),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;

  res.json({
    id: _id,
    name,
    email,
  });
});

module.exports = { registerUser, loginUser, getMe };
