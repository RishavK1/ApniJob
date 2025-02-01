import { COMPANY_API } from "@/components/utils/constant";
import { setCompanies } from "@/redux/CompanySlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      setIsLoading(true);
      const startTime = Date.now();

      try {
        const res = await axios.get(`${COMPANY_API}/get/`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }

      // Ensure minimum loading time of 1.5 seconds
      const elapsedTime = Date.now() - startTime;
      const minimumLoadTime = 1400; // 1.4 seconds

      if (elapsedTime < minimumLoadTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoadTime - elapsedTime)
        );
      }

      setIsLoading(false);
    };
    fetchAllCompanies();
  }, []);

  return { isLoading };
};

export default useGetAllCompanies;
