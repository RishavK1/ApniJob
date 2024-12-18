import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    console.log(fullname, email, phonenumber, password, role);
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudRes = await cloudinary.uploader.upload(fileUri.content); 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        profilephoto: cloudRes.secure_url,
      },
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something Went Wrong",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
    if (user.role !== role) {
      return res.status(400).json({
        message: "User role is incorrect",
        success: false,
      });
    }
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    user = {
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
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;

    // Extract user ID from the authentication middleware
    const userId = req.id;

    // Fetch the user from the database
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Updating text-based fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;

    // Handling skills (convert comma-separated string to array)
    if (skills) {
      user.profile.skills = skills.split(",");
    }

    // Check if a new file is uploaded before processing
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content);

      // Update the resume URL and original name
      user.profile.resume = cloudRes.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    // Save the updated user details
    await user.save();

    // Prepare the updated user data to send in response
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

