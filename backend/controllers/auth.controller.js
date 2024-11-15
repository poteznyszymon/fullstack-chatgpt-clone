import { User } from "../models/userSchema.js";
import bycrypt from "bcryptjs";
import { generateAndSetCookie } from "../utils/generateCookie.js";

export const registerUser = async (req, res) => {
  try {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password)
      return res.status(400).json({
        success: false,
        error: "username, email or password not provieded",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, error: "Email already taken" });

    const hashedPassword = await bycrypt.hash(password, 10);

    const user = new User({
      displayName: displayName,
      email,
      password: hashedPassword,
    });

    generateAndSetCookie(res, user._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: user.displayName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "Username or password not provided" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, error: "User not found" });

    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });

    generateAndSetCookie(res, user._id);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user.displayName,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const verifyAuth = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(400).json({ error: "User not found" });
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const logoutUser = (_req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
