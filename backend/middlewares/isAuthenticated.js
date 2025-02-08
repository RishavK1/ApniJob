import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // If token is not in cookies, check Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // "Bearer <token>"
    }


    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user. No token provided.",
        success: false,
      });
    }

    // Verify token
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decode.userId; // Attach user ID to request
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired. Please log in again.",
        success: false,
      });
    }

    return res.status(401).json({
      message: "Invalid token. Authentication failed.",
      success: false,
    });
  }
};


export default isAuthenticated;
