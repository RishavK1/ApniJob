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

     const userId = req.id;

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
        message: "Somethig went wrong",
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
          createdBy: userId,
      });
      res.status(201).json({
          message: "Job Created succefully",
          newJob,
          success: true,
      });
  } catch (error) {
    console.log(error);
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
        const adminId = req.params.id;
        const jobs = await Job.find({created_by: adminId }).populate({
            path: "company",
            createdAt:-1,
        });
        if (!jobs) {
            
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(201).json({
            message: "Jobs found",
            jobs,
            success: true,
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
