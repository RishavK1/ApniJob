import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const DiffJob = ({ job }) => {
  const navigate = useNavigate();

  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-xl shadow-xl bg-white border-gray-200 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {dayAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${dayAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button
          className="p-6 rounded-2xl bg-gray-200 hover:bg-gray-200"
          size="icon"
          variant=""
        >
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <div className="text-sm text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {job?.description}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.postion} Positions
        </Badge>
        <Badge className="text-red-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Button
          onClick={() => navigate(`/job/description/${job?._id}`)}
          className="border border-gray-300 rounded-xl bg-purple-700 text-white hover:bg-purple-700"
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default DiffJob;
