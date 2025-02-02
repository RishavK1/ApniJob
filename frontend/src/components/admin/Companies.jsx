import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/CompanySlice";

const PulseWaveLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px]">
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 bg-gray-800 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        ></div>
      ))}
    </div>
    <p className="mt-4 text-gray-600 font-medium">Loading companies...</p>
  </div>
);

const Companies = () => {
  const { isLoading } = useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <input
            className="border border-gray-400 p-2 my-2 w-fit rounded-xl focus:ring focus:outline-none"
            placeholder="Filter By name "
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/company/new")}
            className="bg-black text-white hover:bg-black rounded-2xl"
          >
            New Company
          </Button>
        </div>

        {isLoading ? <PulseWaveLoader /> : <CompaniesTable />}
      </div>
    </div>
  );
};

export default Companies;
