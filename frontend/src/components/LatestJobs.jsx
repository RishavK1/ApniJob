import React from 'react'
import JobCards from './JobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {

  const {allJobs} = useSelector(store => store.job);
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
        className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <=0 ? <span>No Jobs Available</span> : allJobs?.slice(0,6).map((job) => (
          <JobCards key={job._id} job={job} />
        ))}
      </motion.div>
    </div>
  );
}

export default LatestJobs