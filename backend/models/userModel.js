const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compareSync(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
