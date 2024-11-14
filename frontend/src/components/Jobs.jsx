import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import DiffJob from "./DiffJob";

const Jobs = () => {
  let jobs = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {jobs.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4  ">
                {jobs.map((job, index) => (
                  <div>
                    <DiffJob />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
