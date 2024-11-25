import React from 'react'
import { Button } from './ui/button'
import { BookmarkIcon } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {  useNavigate } from 'react-router-dom';

const DiffJob = () => {
  const navigate = useNavigate();
  const JobId = "asdfghjk";
  return (
    <div className="p-5 rounded-xl shadow-xl bg-white border-gray-200">
      <div className="flex items-center justify-between">
        <p className='text-sm text-gray-600'>2 days ago</p>
        <Button
          className="rounded-full bg-gray-100 hover:bg-gray-200"
          size="icon"
        >
          <BookmarkIcon />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button
          className="p-6 rounded-2xl bg-gray-200 hover:bg-gray-200"
          size="icon"
          variant=""
        >
          <Avatar>
            <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-logo-design-any-corporate-brand-business-company_1253202-77511.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>Company name</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 Positions
        </Badge>
        <Badge className="text-red-700 font-bold " variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-purple-700 font-bold " variant="ghost">
          20LPA
        </Badge>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Button onClick={()=> navigate(`/job/description/${JobId}`)} className="border border-gray-300 rounded-xl ">Details</Button>
        <Button className="bg-[#6A38C2] hover:bg-[#6A38C2] text-white rounded-xl ">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default DiffJob