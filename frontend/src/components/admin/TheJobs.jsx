import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const TheJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar></Navbar>
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <input
            className="border border-gray-400 p-2 my-2 w-[400px] rounded-xl focus:ring focus:outline-none"
            placeholder="Filter by name , role "
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/new")}
            className="bg-black text-white hover:bg-black rounded-2xl"
          >
            New Jobs
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
};

export default TheJobs;
