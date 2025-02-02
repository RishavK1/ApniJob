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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading , user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/"); // Redirect on successful login
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  })

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mt-5 mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-300 rounded-xl p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

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
            <Label>Password</Label>
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
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-0 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-black w-full mb-3 text-white px-4 py-2 rounded-2xl hover:bg-black hover:text-white"
            >
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
