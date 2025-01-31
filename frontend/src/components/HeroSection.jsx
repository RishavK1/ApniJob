import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection =()=> {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job Finding Website
        </span>
        <h1 className="text-5xl font-bold">
          Search Apply & <br></br> Get Your
          <span className="text-[#6A38C2]"> Dream Jobs</span>
        </h1>
        <p> Kickstart Your Dream Career – Find Jobs Now!</p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Search Job Here"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          ></input>
          <Button
            className="rounded-r-full bg-[#6A38C2] hover:bg-[#6A38C2] border-none items-center"
            onClick={searchHandler}
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;