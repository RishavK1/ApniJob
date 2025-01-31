import { APPLICATION_API } from "@/components/utils/constant";
import { setAllAppledJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
          const res = await axios.get(`${APPLICATION_API}/get`, {
              withCredentials: true,
          });
          if (res.data.success) {
              dispatch(setAllAppledJobs(res.data.application));
          }
      } catch (error) {
        console.log(error);
      }
      };
      fetchAppliedJobs();
  },[]);
};

export default useGetAllAppliedJobs;
