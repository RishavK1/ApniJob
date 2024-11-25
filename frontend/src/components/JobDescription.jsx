import React from 'react'
import { Badge } from "./ui/badge";
import { Button } from './ui/button';

const JobDescription = () => {
  const isApplied = false; 
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl"> Frontend Developer</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              12 Positions
            </Badge>
            <Badge className="text-red-700 font-bold " variant="ghost">
              Part Time
            </Badge>
            <Badge className="text-purple-700 font-bold " variant="ghost">
              20LPA
            </Badge>
          </div>
        </div>
        <div className="bg-[#6A38C2] rounded-2xl text-white  hover:text-white">
          <Button
            className={`rounded-2xl ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed hover:bg-gray-600"
                : "bg-[#6A38C2] hover:bg-[#6A38C2] hover:text-white"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-5">
        <h1 className="font-bold my-1">
          Role :
          <span className="pl-4 font-normal text-gray-800">
            Frontend Developer
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location :
          <span className="pl-4 font-normal text-gray-800">New Delhi</span>
        </h1>
        <h1 className="font-bold my-1">
          Description :
          <span className="pl-4 font-normal text-gray-800">
            Lorem ipsum dolor sit amet.
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience :
          <span className="pl-4 font-normal text-gray-800">2 yrs</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary :<span className="pl-4 font-normal text-gray-800">12 LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Apllicants :
          <span className="pl-4 font-normal text-gray-800">2</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date :
          <span className="pl-4 font-normal text-gray-800">12-2-2024</span>
        </h1>
      </div>
    </div>
  );
}
export default JobDescription;