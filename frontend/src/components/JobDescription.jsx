import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API, APPLICATION_API } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Navbar from "./shared/Navbar";

const JobContentLoader = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-8 text-gray-600">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm text-purple-900">Back to All Jobs</span>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-600">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-1/2">
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
          </div>
          <div className="w-32 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        {/* Badges Section */}
        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Description Section */}
        <div className="space-y-6">
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Requirements Section */}
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index}>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const isInitialApplied = singleJob?.application?.some(
    (application) => application.applicant === user?._id
  );
  const [isApplied, setIsApplied] = useState(isInitialApplied || false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.applications, { applicant: user._id }],
        };
        toast.success(res.data.message);
        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setIsLoading(true);
      const startTime = Date.now();

      try {
        const res = await axios.get(`${JOB_API}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }

      // Ensure minimum loading time of 1.5 seconds
      const endTime = Date.now();
      const loadingTime = endTime - startTime;
      const minimumLoadingTime = 1500; // 1.5 seconds

      if (loadingTime < minimumLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoadingTime - loadingTime)
        );
      }

      setIsLoading(false);
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {isLoading ? (
        <JobContentLoader />
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-8 text-gray-600">
            <ArrowLeft className="w-4 h-4" />
            <a href="/jobs" className="text-sm text-purple-900">
              Back to All Jobs
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-600">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-purple-900 mb-2">
                  {singleJob?.title}
                </h1>
              </div>
              <Button
                onClick={isApplied ? null : applyJobHandler}
                className={`px-6 rounded-xl ${
                  isApplied
                    ? "bg-gray-600 text-white cursor-not-allowed hover:bg-gray-600"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>

            <div className="flex gap-3 mb-8">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 rounded-full px-3">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-green-100 hover:bg-green-100  text-green-800 rounded-full px-3">
                {singleJob?.salary} LPA
              </Badge>
              <Badge className="bg-purple-100 hover:bg-purple-100 text-purple-800 rounded-full px-3">
                {singleJob?.experienceLevel} Years
              </Badge>
              <Badge className="bg-gray-100 hover:bg-gray-100 text-gray-800 rounded-full px-3">
                {singleJob?.location}
              </Badge>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Job Description
                </h2>
                <p className="text-gray-800">{singleJob?.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Job Requirements
                </h2>
                <div className="flex flex-wrap gap-2">
                  {singleJob?.requiremensts?.map((requirement, index) => (
                    <Badge
                      key={index}
                      className="bg-yellow-200 text-yellow-900 hover:bg-yellow-100 rounded-full px-3"
                    >
                      {requirement}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">Experience</h3>
                  <p className="text-gray-900">
                    {singleJob?.experienceLevel} years
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">
                    Total Applicants
                  </h3>
                  <p className="text-gray-900">
                    {singleJob?.application?.length || 0}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">Posted Date</h3>
                  <p className="text-gray-900">
                    {singleJob?.createdAt?.split("T")[0]}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">
                    Available Positions
                  </h3>
                  <p className="text-gray-900">{singleJob?.postion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
