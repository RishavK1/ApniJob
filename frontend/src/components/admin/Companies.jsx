import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/CompanySlice";

const LoaderDots = () => (
  <div className="flex flex-col items-center justify-center">
    <p className="text-2xl font-semibold text-gray-700">Loading</p>
    <div className="flex gap-2 mt-2">
      <div
        className="w-3 h-3 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-3 h-3 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
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
      <Navbar></Navbar>
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <LoaderDots />
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit border-gray-950 rounded-xl"
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
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
