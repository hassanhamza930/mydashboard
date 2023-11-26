import React from "react";
import useUser from "../hooks/useUser";
import dummyProfile from "../assets/images/dummyProfile.webp";
import Input from "../components/ui/Input";

export const Profile = () => {
  const user = useUser();
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold mb-5">User Prfile</h1>
      </div>
      <img
        className="h-20 w-20 
                    rounded-full
                    object-cover
                    shadow-md
                    bg-white
                    border-2
                    border-white"
        src={user?.photoURL ? user?.photoURL : dummyProfile}
        alt=""
      />
      <div className="flex flex-col mt-5">
        <label className="text-sm mt-2 text-slate-500" htmlFor="name">
          Name
        </label>
        <Input
          className="w-80 border-2 border-slate-300 rounded-lg "
          disabled
          value={user?.name}
          type="text"
        />
        <label className="text-sm mt-2 text-slate-500" htmlFor="email">
          Email
        </label>
        <Input
          className="w-80 border-2 border-slate-300 rounded-lg "
          disabled
          value={user?.email}
          type="text"
        />
      </div>
    </div>
  );
};
