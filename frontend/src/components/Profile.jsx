import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://img.freepik.com/premium-vector/minimalist-logo-design-any-corporate-brand-business-company_1253202-77511.jpg"
                alt="profile image"
              ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full name</h1>
              <p>Add your bio here</p>
            </div>
          </div>
          <Button
            className="text-right border border-gray-200 rounded-xl hover:bg-gray-100"
            variant="outline"
          >
            <Pen></Pen>
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail></Mail>
            <span>rishav@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact></Contact>
            <span>999999999</span>
                  </div>
                  <div>
                      <h1>Skills</h1>
                      {
                          [1,2,3,4].map((item, index)=><Badge key={index} className="bg-gray-300">{item}</Badge>)
                      }
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
