import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/Input.jsx";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import SignupSkeletonLoader from "./SignupSkeletonLoader";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "",
    file: "",
  });
  const [pageLoading, setPageLoading] = useState(true); // New state for initial page load
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phonenumber", input.phonenumber);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("profilephoto", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000); // You can adjust this time or replace with actual data loading

    if (user) {
      navigate("/");
    }

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      {pageLoading ? (
        <SignupSkeletonLoader />
      ) : (
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-1/2 border border-gray-300 p-4 my-10 rounded-xl"
          >
            {/* Rest of your existing form code */}
            <h1 className="font-bold text-xl mb-2">Sign up</h1>
            <div className="my-2">
              <Label>Full Name</Label>
              <input
                type="text"
                className="border border-gray-400 p-2 my-2 w-full rounded-xl focus:ring focus:outline-none"
                placeholder="Enter your full name"
                name="fullname"
                value={input.fullname}
                onChange={changeEventhandler}
              />
            </div>
            {/* ... Rest of your form fields ... */}
            <div className="my-2">
              <Label>Email</Label>
              <input
                type="text"
                className="border border-gray-400 p-2 my-2 w-full rounded-xl focus:ring focus:outline-none"
                placeholder="Enter your email"
                name="email"
                value={input.email}
                onChange={changeEventhandler}
              />
            </div>
            <div className="my-2">
              <Label>Phonenumber</Label>
              <input
                type="text"
                className="border border-gray-400 p-2 my-2 w-full rounded-xl focus:ring focus:outline-none"
                placeholder="Enter your phonenumber"
                name="phonenumber"
                value={input.phonenumber}
                onChange={changeEventhandler}
              />
            </div>
            <div className="my-2">
              <Label>Password </Label>
              <input
                type="password"
                className="border border-gray-400 p-2 my-2 w-full rounded-xl focus:ring focus:outline-none"
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
                <input
                  accept="image/*"
                  type="file"
                  className="border border-gray-400 p-2 cursor-pointer my-2 w-fit rounded-xl focus:ring focus:outline-none"
                  onChange={changeFilehandler}
                />
              </div>
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
                Signup
              </Button>
            )}
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
