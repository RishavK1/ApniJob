import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import DiffJob from "./DiffJob";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// Skeleton loader for a single job card
const JobCardSkeleton = () => (
  <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="w-3/4">
        <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"
        ></div>
      ))}
    </div>

    <div className="flex justify-between items-center pt-3 border-t">
      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

// Skeleton loader for the filter card
const FilterCardSkeleton = () => (
  <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm">
    <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-6"></div>

    {[1, 2, 3, 4].map((section) => (
      <div key={section} className="mb-6">
        <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-3"></div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-2 mb-2">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchedQuery) {
      const filterJob = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilteredJobs(filterJob);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/4">
            {isLoading ? <FilterCardSkeleton /> : <FilterCard />}
          </div>
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <JobCardSkeleton />
                  </motion.div>
                ))}
              </div>
            ) : filteredJobs.length <= 0 ? (
              <span>Job Not Found</span>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <DiffJob job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
