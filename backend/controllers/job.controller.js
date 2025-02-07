import Job from "../models/job.model.js";

// Job will be posted by admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requiremensts,
      salary,
      location,
      postion,
      jobType,
      companyId,
      experience,
    } = req.body;

    const userId = req.id; // Logged-in admin ID

    if (
      !title ||
      !description ||
      !requiremensts ||
      !salary ||
      !location ||
      !jobType ||
      !postion ||
      !companyId ||
      !experience
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const newJob = await Job.create({
      title,
      description,
      requiremensts: requiremensts.split(","), // Convert comma-separated string to array
      salary,
      location,
      postion,
      jobType,
      companyId,
      experienceLevel: experience,
      company: companyId,
      createdBy: userId, // Associate job with admin
    });

    res.status(201).json({
      message: "Job created successfully",
      newJob,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Fetch all jobs (for students or general users)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // Search keyword (if any)

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select: "name location", // Populate only required fields from company
      })
      .sort({
        createdAt: -1, // Sort by newest first
      });

    if (!jobs.length) {
      return res.status(404).json({
        message: "No jobs found",
        jobs: [],
        success: true,
      });
    }

    res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Fetch job by ID (for students or general users)
export const getJobByid = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "application", // Populate associated applications (if applicable)
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Job found",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Fetch jobs created by the logged-in admin
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id; // Ensure this is taken from authentication middleware

    // Fetch only jobs created by this admin
    const jobs = await Job.find({ createdBy: adminId })
      .populate({
        path: "company",
        select: "name location", // Populate only required fields
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(200).json({
        message: "No jobs found",
        jobs: [],
        success: true,
      });
    }

    res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
