import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export const LatestJobsLoader = () => {
  const skeletonCards = Array(6).fill(null);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="h-10 bg-gray-200 w-96 rounded-lg animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-4 w-3/4"></div>
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3].map((badge) => (
                <div
                  key={badge}
                  className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h2>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5"
      >
        {allJobs.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <JobCards key={job._id} job={job} />)
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
