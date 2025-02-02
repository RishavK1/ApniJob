import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import DiffJob from "./DiffJob";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const BrowseLoader = () => {
  const skeletonCards = Array(6).fill(null);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center gap-2 mb-10">
        <div className="h-7 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

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

            <div className="flex justify-between items-center mt-4">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <BrowseLoader />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">Results ({allJobs.length})</h1>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {allJobs.map((job) => {
            return <DiffJob key={job._id} job={job} />;
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
