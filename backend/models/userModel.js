const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "cannot exceed 30 characters"],
    minLength: [4, " should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Phone Number"],
    maxLength: [11, " cannot exceed more than 11 digits"],
    validate: {
      validator: function (v) {
        return /^[0-9]{11}/.test(v);
      },
      message: "{VALUE} is not a valid 11 digit number!",
    },
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, " should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },

  role: {
    type: String,
    enum: [
      "Staff",
      "Student",
      "Faculty",
      "Stock Manager",
      "Coordinator",
      "Vendor",
      "Admin",
      "Account Officer",
    ],
    default: "Staff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
