import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
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
                onClick={()=>searchHandler(cat)}
                variant="outline"
                className="rounded-full border-[#6A38C2]-500 hover:bg-gray-100"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-gray-200" />
        <CarouselNext className="hover:bg-gray-200" />
      </Carousel>
    </div>
  );
};

export default Category;
