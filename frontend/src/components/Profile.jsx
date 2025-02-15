import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";

// Profile Card Skeleton Loader
const ProfileCardLoader = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar Skeleton */}
          <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse"></div>
          <div>
            {/* Name Skeleton */}
            <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
            {/* Bio Skeleton */}
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Edit Button Skeleton */}
        <div className="h-10 w-10 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

      <div className="my-5">
        {/* Email Skeleton */}
        <div className="flex items-center gap-3 my-2">
          <Mail className="text-gray-200" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        {/* Phone Skeleton */}
        <div className="flex items-center gap-3 my-2">
          <Contact className="text-gray-200" />
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
        </div>
        {/* Skills Section Skeleton */}
        <div className="my-5">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
        {/* Resume Section Skeleton */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Applied Jobs Table Skeleton
const AppliedJobsTableLoader = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6">
      {/* Table Header Skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-4"></div>

      {/* Table Rows Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <ProfileCardLoader />
        <AppliedJobsTableLoader />
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
                src={user?.profile?.profilephoto ?? ""}
                alt="profile image"
              ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-bold text-xl">{user?.fullname ?? "N/A"}</h1>
              <p>{user?.profile?.bio ?? "N/A"}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right border border-gray-300 rounded-xl hover:bg-gray-100"
            variant="outline"
          >
            <Pen></Pen>
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail></Mail>
            <span>{user?.email ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact></Contact>
            <span>{user?.phonenumber ?? "N/A"}</span>
          </div>
          <div className="my-5">
            <h1 className="font-bold">Skills</h1>
            <div className="flex items-center gap-1 mt-2">
              {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index} className="bg-gray-300 hover:bg-gray-300">
                    {item}
                  </Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {user?.profile?.resume ? (
              <a
                target="blank"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <AppliedJobTable></AppliedJobTable>
      </div>
      <UpdateProfile open={open} setOpen={setOpen}></UpdateProfile>
    </div>
  );
};

export default Profile;
