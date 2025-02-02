import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Search, Plus } from "lucide-react";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/CompanySlice";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";

const TableSkeletonRow = () => (
  <div className="flex gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
    <div className="h-10 w-10 bg-gray-100 rounded-lg animate-pulse"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-100 rounded animate-pulse w-[200px]"></div>
      <div className="h-3 bg-gray-50 rounded animate-pulse w-[150px]"></div>
    </div>
    <div className="w-32">
      <div className="h-4 bg-gray-100 rounded animate-pulse w-full"></div>
    </div>
  </div>
);

const Companies = () => {
  const { isLoading, data: companies } = useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        {" "}
        {/* Adjusted pt-20 to pt-8 */}
        {/* Header Section */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
          <p className="text-gray-600">
            Manage and track all registered companies
          </p>
        </div>
        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search companies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-opacity"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              onClick={() => navigate("/admin/company/new")}
              className="flex-1 sm:flex-none bg-black text-white hover:bg-black/90 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Company
            </Button>
          </div>
        </div>
        {/* Companies List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="divide-y divide-gray-100">
              {[...Array(5)].map((_, i) => (
                <TableSkeletonRow key={i} />
              ))}
            </div>
          ) : (
            <CompaniesTable companies={companies} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
