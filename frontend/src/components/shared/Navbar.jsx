import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

import { LogOut, User2, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API } from "../utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${USER_API}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.messsage || "Logout failed");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold">
              Apni<span className="text-[#F83002]">Job</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-2xl hover:border-gray-500"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="border bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-2xl">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border border-blue-200">
                  <AvatarImage
                    src={user?.profile?.profilephoto}
                    alt={user?.fullname || "User"}
                  />
                  <AvatarFallback>
                    <User className="h-6 w-6 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-white rounded-2xl">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer border border-blue-200">
                    <AvatarImage
                      src={user?.profile?.profilephoto}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback>
                      <User className="h-6 w-6 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user &&
                    user.role === "student" &&
                    location.pathname !== "/profile" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button
                          variant="link"
                          className="text-blue-600 hover:underline"
                        >
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      variant="link"
                      className="text-red-600 hover:underline"
                      onClick={logouthandler}
                    >
                      Log out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
