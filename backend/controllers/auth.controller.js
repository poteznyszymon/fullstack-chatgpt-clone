import { User } from "../models/userSchema.js";
import bycrypt from "bcryptjs";
import { generateAndSetCookie } from "../utils/generateCookie.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ error: "username, email or password not provieded" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already taken" });

    const hashedPassword = await bycrypt.hash(password, 10);

    const user = new User({
      displayName: username,
      email,
      password: hashedPassword,
    });

    generateAndSetCookie(res, user.displayName);
    await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Username or password not provided" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    generateAndSetCookie(res, user.displayName);
    res
      .status(200)
      .json({ message: "User logged in successfully", user: user.displayName });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
