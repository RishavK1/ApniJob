import { JOB_API } from "@/components/utils/constant";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, allJobs } = useSelector((store) => store.job);

  const fetchAllJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${JOB_API}/get?keyword=${searchedQuery}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [dispatch, searchedQuery]);

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchAllJobs();
    }, 500); // Debounce time (adjust if needed)

    return () => clearTimeout(debounceFetch);
  }, [fetchAllJobs]);

  return allJobs; // Return the jobs so components can use them
};

export default useGetAllJobs;
