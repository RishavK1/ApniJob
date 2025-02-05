import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API } from "../utils/constant";
import { setApplicants } from "@/redux/applicationSlice";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";

const Applicants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  const fetchAllApplicants = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API}/${params.id}/applicants`,
        { withCredentials: true }
      );
      dispatch(setApplicants(res.data.job));
    } catch (error) {
      toast.error("Failed to fetch applicants");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchAllApplicants();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold">Applications Overview</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {applicants?.application?.length || 0} Total
            </span>
          </div>
          <ApplicantsTable
            applications={applicants?.application}
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
