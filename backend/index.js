import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";
import connectDb from "./utils/db.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Updated CORS Configuration
app.use(
  cors({
    origin: "https://apni-job.vercel.app", // Allow frontend on Vercel
    credentials: true, // Allow cookies, authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// API Routes
app.use("/api/v1/user/", userRoute);
app.use("/api/v1/company/", companyRoute);
app.use("/api/v1/jobs/", jobRoute);
app.use("/api/v1/application/", applicationRoute);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});
// Start Server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined
app.listen(PORT, () => {
  connectDb(); // Connect to the database
  console.log(`Server is running on port ${PORT}`);
});
