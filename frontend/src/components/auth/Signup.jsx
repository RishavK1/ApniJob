import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label.jsx";
import {Input} from "../ui/Input.jsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Enter your full name" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="text" placeholder="Enter your email" />
          </div>
          <div className="my-2">
            <Label>Phonenumber</Label>
            <Input type="number" placeholder="Enter your phonenumber" />
          </div>
          <div className="my-2">
            <Label>Password </Label>
            <Input type="password" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
