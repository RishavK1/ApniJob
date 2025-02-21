import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border border-gray-500">
              <AvatarImage
                src={
                  user?.profile?.profilephoto
                    ? `${user.profile.profilephoto}?${Date.now()}`
                    : undefined
                }
                alt={user?.fullname || "Profile"}
              />
              <AvatarFallback className="bg-gray-200">
                <User className="h-12 w-12 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-xl">{user?.fullname ?? "N/A"}</h1>
              <p>{user?.profile?.bio ?? "No bio available"}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right border border-gray-300 rounded-xl hover:bg-gray-100"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phonenumber ?? "N/A"}</span>
          </div>
          <div className="my-5">
            <h1 className="font-bold">Skills</h1>
            <div className="flex flex-wrap items-center gap-1 mt-2">
              {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-300 hover:bg-gray-300 mb-1"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span>No skills listed</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user.profile.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <span>No resume uploaded</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <AppliedJobTable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
