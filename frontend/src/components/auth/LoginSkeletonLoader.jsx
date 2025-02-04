// LoginSkeletonLoader.jsx
import React from "react";

const LoginSkeletonLoader = () => {
  return (
    <div className="flex items-center justify-center max-w-7xl mt-5 mx-auto">
      <div className="w-1/2 border border-gray-300 rounded-xl p-4 my-10">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded-md w-24 mb-5 animate-pulse"></div>

        {/* Email Field Skeleton */}
        <div className="my-2">
          <div className="h-4 bg-gray-200 rounded-md w-16 mb-2 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-full animate-pulse"></div>
        </div>

        {/* Password Field Skeleton */}
        <div className="my-2">
          <div className="h-4 bg-gray-200 rounded-md w-20 mb-2 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-full animate-pulse"></div>
        </div>

        {/* Radio Buttons Skeleton */}
        <div className="flex items-center gap-4 my-5">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded-2xl w-full mb-3 animate-pulse"></div>

        {/* Sign up Link Skeleton */}
        <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoginSkeletonLoader;
