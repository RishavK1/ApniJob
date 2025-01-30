import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { JOB_API } from "../utils/constant";

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requiremensts: "", 
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    postion: 0, 
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({
      ...input,
      companyId: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      console.log("Input being sent:", input);

      if (!input.companyId) {
        toast.error("Please select a company before posting the job.");
        return;
      }

      const postionAsNumber = Number(input.postion);
      if (isNaN(postionAsNumber)) {
        toast.error("Number of positions must be a valid number.");
        return;
      }

      // Prepare the data to match the backend expectations
      const jobData = {
        title: input.title,
        description: input.description,
        requiremensts: input.requiremensts, 
        salary: input.salary,
        location: input.location,
        postion: postionAsNumber, 
        jobType: input.jobType,
        companyId: input.companyId,
        experience: input.experience,
      };

      // Send the request
      const res = await axios.post(`${JOB_API}/postJob`, jobData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Handle the response
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      if (error.response) {
        // Log the server's error message
        console.error("Server error message:", error.response.data.message);
        toast.error(
          error.response.data.message ||
            "Bad Request: Invalid data sent to server."
        );
      } else {
        toast.error("Network error: Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-11">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-300 shadow-xl rounded-xl"
        >
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
                name="requiremensts" 
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter requirements"
                value={input.requiremensts}
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
                name="postion" 
                className="border border-gray-500 p-2 w-full my-2 rounded-xl focus:ring focus:outline-none"
                placeholder="Enter position"
                value={input.postion}
                onChange={changeEventHandler}
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-xl mb-4">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
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

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-black w-full mb-3 text-white px-4 py-2 rounded-2xl hover:bg-black hover:text-white"
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-5">
              *Please register a company first, before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
