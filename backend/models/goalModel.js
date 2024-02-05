const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Please add a text value"] },
  },
  { timestamps: true }
);

const GoalModel = mongoose.model("Goal", goalSchema);

module.exports = GoalModel;
