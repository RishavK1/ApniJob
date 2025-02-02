// hooks/useGetAllJobs.js
import { JOB_API } from "@/components/utils/constant";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth); // Get user from Redux store
  const isLoggedIn = Boolean(user); // Check if user is logged in

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API}/get?keyword=${searchedQuery}`, {
          withCredentials: isLoggedIn, // Only send credentials if logged in
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery, isLoggedIn]);
};

export default useGetAllJobs;
