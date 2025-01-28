import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const regiterComapny = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Company name is required",
                success : false
                
             });
        }
        let company = await Company.findOne({ name: name });
        if (company) { 
            return res.status(400).json({
                message: "You cannot regiter same comapany",
                success: false
            });
        }
        company = await Company.create({
            name: name,
            userId: req.id,
        });
        res.status(201).json({
            message: "Company created successfully",
            company,
            success: true,
        })

    } catch (error) {
        console.log(error);
        
    }
}
// with this we will get all the compaines register by one user .
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        res.status(200).json({
            message: "Companies found", // waiting 
            companies,
            success: true
        });
        
    } catch (error) {
        console.log(error);
        
    }
}
// now with we will get the particular company with id of user which we want
 
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) { 
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company found successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file; // The uploaded file

    // Validate the required fields
    if (!name || !description || !website || !location) {
      return res.status(400).json({
        message:
          "All fields (name, description, website, location) are required.",
        success: false,
      });
    }

    // Process the uploaded file with Cloudinary if provided
    let logo;
    if (file) {
      const fileUri = getDataUri(file); // Convert the file to a data URI
      const cloudRes = await cloudinary.uploader.upload(fileUri.content); // Upload to Cloudinary
      logo = cloudRes.secure_url; // Get the secure URL from Cloudinary
    }

    // Prepare the update data
    const companyId = req.params.id;
    const updateData = { name, description, website, location };
    if (logo) {
      updateData.logo = logo; // Add logo URL if available
    }

    // Update the company in the database
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true, // Return the updated document
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Company information updated successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};