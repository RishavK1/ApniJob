import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

let category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
];

export const CategoryLoader = () => {
  const skeletonCategories = Array(5).fill(null);
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {skeletonCategories.map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
              <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-gray-200 border border-gray-300" />
        <CarouselNext className="hover:bg-gray-200 border border-gray-300" />
      </Carousel>
    </div>
  );
};

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
              <Button
                onClick={() => searchHandler(cat)}
                variant="outline"
                className="rounded-full border border-purple-950 hover:bg-purple-500"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-gray-200 border border-purple-950" />
        <CarouselNext className="hover:bg-gray-200 border border-purple-950" />
      </Carousel>
    </div>
  );
};

export default Category;
