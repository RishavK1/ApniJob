import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import HeroSection, { HeroSectionLoader } from "./HeroSection";
import Category, { CategoryLoader } from "./Category";
import LatestJobs, { LatestJobsLoader } from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <HeroSectionLoader />
        <CategoryLoader />
        <LatestJobsLoader />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Category />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
