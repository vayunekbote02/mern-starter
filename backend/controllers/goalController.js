const asyncHandler = require("express-async-handler");
const GoalModel = require("../models/goalModel");
const UserModel = require("../models/userModel");

// @desc    Return user's goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await GoalModel.find({ user: req.user._id });
  res.status(200).json(goals);
});

// @desc    Set user's goal
// @route   SET /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a goal.");
  }

  const goal = await GoalModel.create({
    text: req.body.text,
    user: req.user._id,
  });
  res.status(200).json(goal);
});

// @desc    Update user's goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // * Making sure that user can update only his/her goal
  if (goal.user.toString() !== user._id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  // Updating the goal
  const updatedGoal = await GoalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedGoal);
});

// @desc    Delete user's goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // * Making sure that user can delete only his/her goal
  if (goal.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  await GoalModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted the goal" });
});

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
