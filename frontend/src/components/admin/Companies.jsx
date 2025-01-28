import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar></Navbar>
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit border-gray-950 rounded-xl"
            placeholder="Filter By name "
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