import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({
        message: "Account created successfully",
        success: true,
        user: newUser,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     if (!email || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials", success: false });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User not found", success: false });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res
//         .status(400)
//         .json({ message: "Incorrect password", success: false });
//     }

//     if (user.role !== role) {
//       return res
//         .status(400)
//         .json({ message: "Incorrect role", success: false });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "2d",
//     });
//     return res
//       .status(200)
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user,
//         token,
//         success: true,
//       });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }

    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "Incorrect role", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true, // ✅ Important for security
      secure: process.env.NODE_ENV === "production", // ✅ Only secure in production
      sameSite: "strict",
    });

    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      user,
      token, // ✅ Sending token in response body as well
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    const userId = req.id; // ✅ Ensure user ID is being passed correctly


    // Check if the user exists
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Update fields only if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Handle file upload
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content);
      user.profile.profilephoto = cloudRes.secure_url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (err) {
    console.error("Profile update error:", err); // ✅ Log full error

    return res.status(500).json({
      message: "Server error",
      error: err.message,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
