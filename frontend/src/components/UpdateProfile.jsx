import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";

const UpdateProfile = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="bg-white sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4 ">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  className="col-span-3 border border-gray-600 rounded-xl focus:ring-8 focus:ring-black focus:border-black focus:ring-offset-0"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  className="col-span-3 border border-gray-600 rounded-xl focus:ring-8 focus:ring-black focus:border-black focus:ring-offset-0"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Number
                </Label>
                <Input
                  id="phonenumber"
                  name="phonenumber"
                  className="col-span-3 border border-gray-600 rounded-xl focus:ring-8 focus:ring-black focus:border-black focus:ring-offset-0"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  className="col-span-3 border border-gray-600 rounded-xl focus:ring-8 focus:ring-black focus:border-black focus:ring-offset-0"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  className="col-span-3 border border-gray-600 rounded-xl focus:ring-8 focus:ring-black focus:border-black focus:ring-offset-0"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3 border border-gray-600 rounded-xl focus:ring-8 focus:ring-black focus:border-black focus:ring-offset-0"
                ></Input>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
