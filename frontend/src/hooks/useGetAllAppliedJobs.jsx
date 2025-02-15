import { APPLICATION_API } from "@/components/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   console.error("No token found in localStorage");
        //   return;
        // }

        const res = await axios.get(`${APPLICATION_API}/get`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application || [])); // Ensure it's an array
        } else {
          console.error("Failed to fetch applied jobs: ", res.data.message);
          dispatch(setAllAppliedJobs([])); // Set an empty array on failure
        }
      } catch (error) {
        console.error(
          "Error fetching applied jobs:",
          error.response?.data || error.message
        );
        dispatch(setAllAppliedJobs([])); // Set an empty array on error
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;
