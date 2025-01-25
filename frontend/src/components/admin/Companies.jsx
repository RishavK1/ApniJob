import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'

const Companies = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <Input
            className="w-fit border-gray-950 rounded-xl"
            placeholder="Filter By name "
          />
          <Button className="bg-black text-white hover:bg-black rounded-2xl">
            New Company
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Companies