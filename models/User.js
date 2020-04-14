const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    unique: true,
  },
  subject1: {
    type: String,
    default: "Not Checked",
  },
  total1: {
    type: String,
  },
  paper1: {
    type: String,
  },
  paper2: {
    type: String,
  },
  total2: {
    type: String,
  },
  subject2: {
    type: String,
    default: "Not Checked",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

module.exports = mongoose.model("user", UserSchema);
