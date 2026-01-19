const bcrypt = require("bcrypt");
const { z, ZodError } = require("zod");
const { User } = require("../models/User.model");
const { signToken } = require("../utils/JWT");
const { loginSchema, signupSchema } = require("./zodSchema");


/* ===================== LOGIN ===================== */

const LoginUser = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = signToken({
      user_id: user.user_id,
      email: user.email,
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof ZodError
          ? error.issues[0].message
          : "Something went wrong",
    });
  }
};

/* ===================== SIGNUP ===================== */

const SignupUser = async (req, res) => {
  try {
    const { email, password, name } = signupSchema.parse(req.body);

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await User.create({
      email,
      password,
      name,
    });

    const token = signToken({
      user_id: user.user_id,
      email: user.email,
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof ZodError
          ? error.issues[0].message
          : "Something went wrong",
    });
  }
};

module.exports = { LoginUser, SignupUser };
