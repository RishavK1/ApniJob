import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const companyArray = [];
const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const { companies } = useSelector((store) => store.company);
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center w-screen my-11">
        <form className="p-8 max-w-4xl border border-gray-300 shadow-xl rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <input
                type="text"
                name="title"
                className="border border-gray-500 p-2 my-2 w-full rounded-xl focus:ring focus:outline-none"
                placeholder="Enter title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <input
                type="text"
                name="description"
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <input
                type="text"
                name="requirements"
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <input
                type="text"
                name="salary"
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <input
                type="text"
                name="location"
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <input
                type="text"
                name="jobType"
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter Job Type"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience Level </Label>
              <input
                type="text"
                name="experience"
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label> No. of Position</Label>
              <input
                type="number"
                name="position"
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            {companies.length > 0 && (
              <Select>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-xl mb-4">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company.id}
                        value={company.name}
                        className="hover:bg-gray-100 px-6 py-2 flex items-center justify-between"
                      >
                        <span>{company.name}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Button className="bg-black text-white hover:bg-black w-full mt-4 rounded-xl">
            Post New Job
          </Button>
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-5">
              *Please register a company first , before posting a jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
