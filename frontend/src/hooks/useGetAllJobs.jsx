import { JOB_API } from "@/components/utils/constant";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token retrieval
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        console.log("Fetching jobs with token:", token);
        console.log("API URL:", `${JOB_API}/get?keyword=${searchedQuery}`);

        const res = await axios.get(`${JOB_API}/get?keyword=${searchedQuery}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.error("Failed to fetch jobs: ", res.data.message);
        }
      } catch (error) {
        console.error(
          "Error fetching jobs:",
          error.response?.data || error.message
        );
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;
