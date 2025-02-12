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
        const token = localStorage.getItem("token"); // Ensure token retrieval
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        console.log("Fetching applied jobs with token:", token);
        console.log("API URL:", `${APPLICATION_API}/get`);

        const res = await axios.get(`${APPLICATION_API}/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        } else {
          console.error("Failed to fetch applied jobs: ", res.data.message);
        }
      } catch (error) {
        console.error(
          "Error fetching applied jobs:",
          error.response?.data || error.message
        );
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;
