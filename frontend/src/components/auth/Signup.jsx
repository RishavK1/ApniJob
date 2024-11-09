import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/Input.jsx";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const changeEventhandler = (e) => {
    // Update input values based on name attributes
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFilehandler = (e) => {
    // Update the file in input state using optional chaining to avoid undefined errors
    setInput({ ...input, file: e.target.files?.[0] });
  };
const USER_API = "http://localhost:3001/api/user";
  const submitHandler = async (e) => {
    e.preventDefault();

    // Creating FormData for multipart/form-data requests
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phonenumber", input.phonenumber);
    formData.append("role", input.role);

    // Fix: Reference the file from the input state instead of an undefined variable
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // Redirect to login page on successful signup
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={input.email}
              onChange={changeEventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Phonenumber</Label>
            <Input
              type="text"
              placeholder="Enter your phonenumber"
              name="phonenumber"
              value={input.phonenumber}
              onChange={changeEventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Password </Label>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={changeEventhandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFilehandler}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-black w-full my-4 text-white px-4 py-2 rounded-2xl "
          >
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
