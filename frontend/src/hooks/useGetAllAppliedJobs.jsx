import { APPLICATION_API } from "@/components/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchAppliedJobs = async () => {
  //     try {
  //         const res = await axios.get(`${APPLICATION_API}/get`, {
  //             withCredentials: true,
  //         });
  //         if (res.data.success) {
  //             dispatch(setAllAppledJobs(res.data.application));
  //         }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     };
  //     fetchAppliedJobs();
  // },[]);
useEffect(() => {
  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API}/get`, {
        withCredentials: true,
      });
      console.log("API Response:", res.data); // Debugging

      if (res.data.success && res.data.applications) {
        dispatch(setAllAppliedJobs(res.data.applications));
      } else {
        dispatch(setAllAppliedJobs([])); // Set an empty array to prevent undefined issues
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      dispatch(setAllAppliedJobs([])); // Prevent crashes by setting an empty array
    }
  };
  fetchAppliedJobs();
}, [dispatch]);

};

export default useGetAllAppliedJobs;
