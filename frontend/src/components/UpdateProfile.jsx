import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API } from "./utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phonenumber: user?.phonenumber,
    bio: user?.profile?.bio,
    skills:user?.profile?.skills?.map(skill=>skill),
    file: user?.profile?.resume,
  });
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const onFileCghangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullname", input.fullname || "");
      formData.append("email", input.email || "");
      formData.append("phonenumber", input.phonenumber || "");
      formData.append("bio", input.bio || "");

      // Handle skills array properly
      if (Array.isArray(input.skills)) {
        formData.append("skills", input.skills.join(","));
      } else if (typeof input.skills === "string") {
        formData.append("skills", input.skills);
      }

      // Only append file if it exists
      if (input.file) {
        formData.append("resume", input.file);
      }

      const res = await axios.post(`${USER_API}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="bg-white sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmitHandler}>
            <div className="grid gap-4 py-4 ">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={onChangeHandler}
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
                  type="email"
                  value={input.email}
                  onChange={onChangeHandler}
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
                  value={input.phonenumber}
                  onChange={onChangeHandler}
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
                  value={input.bio}
                  onChange={onChangeHandler}
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
                  value={input.skills}
                  onChange={onChangeHandler}
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
                  onChange={onFileCghangeHandler}
                  accept="application/pdf"
                  className="col-span-3 border border-gray-600 rounded-xl focus:ring-8 focus:ring-black focus:border-black focus:ring-offset-0"
                ></Input>
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-0 h-4 w-4 animate-spin" /> Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-black w-full mb-3  text-white px-4 py-2 rounded-2xl hover:bg-black hover:text-white"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
