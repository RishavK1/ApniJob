import React from 'react'
import { Badge } from './ui/badge'

const JobCards = () => {
  return (
    <div className="p-5 rounded-2xl shadow-xl bg-white border border-gray-200 cursor-pointer">
      <h1 className='font-medium text-lg'>Company name</h1>
      <p className='text-sm text-gray-500'>Countary</p>
      <div>
        <h1 className='font-bold text-lg my-2'>Job Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
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
    </div>
  );
}

export default JobCards