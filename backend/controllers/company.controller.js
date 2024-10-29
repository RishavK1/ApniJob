import Company from "../models/company.model.js";
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
        const file = req.file;
        // we will add cloudinary here later

        const companyId = req.params.id;
        const updateData = { name, description, website, location };
        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company  information updated successfully",
            company,
            success: true
        });
        
    } catch (error) {
        console.log(error);
        
    }
}