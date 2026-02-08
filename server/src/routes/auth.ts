import { Router, Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../middlewares/auth";

const router = Router();

/**
 * POST /api/auth/signup
 * Create a new admin user
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName, mobileNo } = req.body;

    // Validate required fields
    if (!username || !password || !firstName || !lastName || !mobileNo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Create new user
    const user = new User({
      username,
      password,
      firstName,
      lastName,
      mobileNo,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("[Auth] Signup error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * POST /api/auth/login
 * Login user and return JWT token
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate token
    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNo: user.mobileNo,
      },
    });
  } catch (err) {
    console.error("[Auth] Login error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
