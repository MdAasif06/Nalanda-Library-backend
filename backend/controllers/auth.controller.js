import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register function
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }
    // Check existing user
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(404).json({
        success: false,
        message: "user already exits",
      });
    }
    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    //Create user
    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role || "Member",
    });

    // Success response
    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "user login successfullt",
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
