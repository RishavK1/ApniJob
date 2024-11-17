import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);

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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  className="border  border-gray-300 text-gray-700 px-4 py-2 rounded-2xl hover:border-gray-500"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="border bg-[#6A38C2] text-white px-4 py-2 rounded-2xl"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Rishav</h4>
                    <p className="text-sm text-muted">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button
                      variant="link"
                      className="text-blue-600 hover:underline"
                    >
                      <Link to="/profile"> View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      variant="link"
                      className="text-red-600 hover:underline"
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
