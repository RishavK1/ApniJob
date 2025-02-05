import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Search, Plus } from "lucide-react";

const TheJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div >
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 ">
        <h1 className="text-2xl font-bold mb-2">Jobs</h1>
        <p className="text-gray-600 mb-6">Manage and track all posted jobs</p>

        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-500 focus:outline-none focus:border-gray-300"
              placeholder="Filter by name, role"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate("/admin/jobs/new")}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-black/90"
          >
            <Plus className="w-4 h-4" />
            <span>New Job</span>
          </button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
};

export default TheJobs;
