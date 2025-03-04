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
    let profilePhotoUrl;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
      console.log("Cloudinary response:", cloudinaryResponse); // Debug log
      profilePhotoUrl = cloudinaryResponse.secure_url;
    }

    const user = await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        profilephoto: profilePhotoUrl || "",
      },
    });

    // Log the created user for debugging
    console.log("Created user:", user);

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: user,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile || {}, // Ensure profile always exists
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Fixed typo from httpsOnly to httpOnly
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
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

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Initialize profile if it doesn't exist
    if (!user.profile) {
      user.profile = {};
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Handle resume upload
    if (req.files && req.files.resume && req.files.resume[0]) {
      const fileUri = getDataUri(req.files.resume[0]);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
        folder: "resumes",
      });
      user.profile.resume = cloudRes.secure_url;
      user.profile.resumeOriginalName = req.files.resume[0].originalname;
    }

    // Handle profile photo upload
    if (req.files && req.files.profilephoto && req.files.profilephoto[0]) {
      const fileUri = getDataUri(req.files.profilephoto[0]);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "image",
        folder: "profiles",
        transformation: [
          { width: 250, height: 250, crop: "fill" },
          { quality: "auto" },
        ],
      });
      user.profile.profilephoto = cloudRes.secure_url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
      success: false,
    });
  }
};
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phonenumber, bio, skills } = req.body;
//     const userId = req.id;

//     let user = await User.findById(userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }

//     // Initialize profile if it doesn't exist
//     if (!user.profile) {
//       user.profile = {};
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phonenumber) user.phonenumber = phonenumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) {
//       user.profile.skills = skills.split(",").map((skill) => skill.trim());
//     }

//     // Handle resume upload
//     if (req.files && req.files.resume && req.files.resume[0]) {
//       const fileUri = getDataUri(req.files.resume[0]);
//       const cloudRes = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "auto",
//         folder: "resumes",
//       });
//       user.profile.resume = cloudRes.secure_url;
//       user.profile.resumeOriginalName = req.files.resume[0].originalname;
//     }

//     // Handle profile photo upload
//     if (req.files && req.files.profilephoto && req.files.profilephoto[0]) {
//       const fileUri = getDataUri(req.files.profilephoto[0]);
//       const cloudRes = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "image",
//         folder: "profiles",
//         transformation: [
//           { width: 250, height: 250, crop: "fill" },
//           { quality: "auto" },
//         ],
//       });
//       user.profile.profilephoto = cloudRes.secure_url;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user,
//       success: true,
//     });
//   } catch (err) {
//     console.error("Profile update error:", err);
//     return res.status(500).json({
//       message: "Server error",
//       error: err.message,
//       success: false,
//     });
//   }
// };