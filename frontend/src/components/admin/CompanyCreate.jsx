import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/CompanySlice";
import { COMPANY_API } from "../utils/constant";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();
  const RegisterCompany = async () => {
    try {
        const res = await axios.post(`${COMPANY_API}/register`, { name: companyName }, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        if (res?.data?.success) {
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`);}
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name </h1>
          <p className="text-gray-500">
            What would you like to give your company name ? You can change this
            later.
          </p>
        </div>
        <Label>Company name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="ApniJob, JobPlay , Google etc"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="rounded-xl border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={RegisterCompany}
            className="bg-black text-white hover:bg-black rounded-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
