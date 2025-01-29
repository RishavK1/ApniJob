import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { use } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/CompanySlice'

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar></Navbar>
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit border-gray-950 rounded-xl"
            placeholder="Filter By name "
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/company/new")}
            className="bg-black text-white hover:bg-black rounded-2xl">
            New Company
          </Button>
        </div>
        
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies