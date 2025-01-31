import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={()=>navigate(`/job/description/${job._id}`)}
      className="p-5 rounded-2xl shadow-xl bg-white border border-gray-200 cursor-pointer">
      <h1 className="font-medium text-lg">{job?.company?.name}</h1>
      <p className="text-sm text-gray-500">{job?.location}</p>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.postion} Positions
        </Badge>
        <Badge className="text-red-700 font-bold " variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-bold " variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default JobCards