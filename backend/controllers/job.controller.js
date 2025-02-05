import Job from "../models/job.model.js";

// Job will be post by admin
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
        message: "Something went wrong",
        success: false,
      });
    }

    const newJob = await Job.create({
      title,
      description,
      requiremensts: requiremensts.split(","),
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
      message: "Job Created successfully",
      newJob,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        return res.status(201).json({
            message: "Jobs found",
            jobs,
            success: true,
        });
        
    } catch (error) {
        console.log(error);
        
    }
}
// also by student
export const getJobByid = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application",
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            })
        }
        return res.status(201).json({
            message: "Job found",
            job,
            success: true,
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

// now by admin 
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id; // Ensure this is taken from authentication middleware

    // Fetch only jobs created by the logged-in admin
    const jobs = await Job.find({ createdBy: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(200).json({
        message: "No jobs found",
        jobs: [],
        success: true,
      });
    }

    return res.status(200).json({
      message: "Jobs found",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
