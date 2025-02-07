import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// User Registration
export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;

    // Validate required fields
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }

    // Handle profile photo upload
    let profilePhotoUrl = null;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudRes.secure_url;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        profilephoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Check the user role
    if (user.role !== role) {
      return res.status(403).json({
        message: "Incorrect role",
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    // Prepare user data to return
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        user: userData,
        success: true,
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// User Logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    const userId = req.id; // Extract user ID from authentication middleware

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;

    // Update skills (convert comma-separated string to array)
    if (skills) {
      user.profile.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Update profile photo or resume if file is uploaded
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content);

      user.profile.resume = cloudRes.secure_url; // Resume URL
      user.profile.resumeOriginalName = req.file.originalname;
    }

    // Save changes
    await user.save();

    // Prepare updated user data
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
