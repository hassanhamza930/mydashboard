import React from "react";
import useUser from "../hooks/useUser";
import dummyProfile from "../assets/images/dummyProfile.webp";
import Input from "../components/ui/Input";
import { Check } from "lucide-react";
import Button from "../components/ui/Button";
import { useIpcRenderer } from "../hooks/useIpcRederer";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const Profile = () => {
  const user = useUser();
  const ipcRenderer = useIpcRenderer();
  const db = getFirestore();
  const updatePlan = (uid: string, plan: string) => {
    setDoc(doc(db, "users", uid), { plan: plan }, { merge: true });
  };

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
      {user?.plan && (
        <div className="flex justify-end max-w-[50vw]">
          <Button
            onClick={() => {
              ipcRenderer.send(
                "open-external-browser",
                `https://billing.stripe.com/p/login/test_cN2aHR9N83qt36w6oo`
              );
            }}
            className="w-fit text-sm font-medium mt-5"
          >
            Manage Subscription
          </Button>
        </div>
      )}
      <div className="flex max-w-[50vw] justify-between mt-5 gap-x-5">
        <div className="border border-slate-200 w-full p-8 rounded-xl">
          <p className="text-blue-700 font-bold ">DashPRO</p>
          <p className="flex my-4 text-5xl font-semibold text-blue-700 relative">
            <span className="text-2xl font-normal">€</span>
            <span>10</span>
            <span className="text-2xl items-end mt-4 font-normal">/year</span>
          </p>
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-y-3 items-start">
              <p className="flex items-center  gap-x-3">
                <Check color="blue" size={16} /> Fast updates
              </p>
              <p className="flex items-center  gap-x-3">
                <Check color="blue" size={16} /> No limit on frames in dashboard
              </p>
              <p className="flex items-center  gap-x-3">
                <Check color="blue" size={16} />
                No limit on dashboard number
              </p>
            </div>
            <div className="flex flex-col gap-y-3 items-start">
              <p className="flex items-center  gap-x-3">
                <Check color="blue" size={16} /> Receiving dashboard via email
              </p>
              <p className="flex items-center  gap-x-3">
                <Check color="blue" size={16} /> save 15% on annual billing
              </p>
              <p className="flex items-center  gap-x-3">
                <Check color="blue" size={16} /> Individual widgets
              </p>
            </div>
          </div>
          {user?.plan === "pro" ? (
            <Button disabled className="w-fit text-sm font-medium mt-5">
              Subscribed
            </Button>
          ) : (
            <Button
              onClick={() => {
                updatePlan(user?.uid, "");
                ipcRenderer.send(
                  "open-external-browser",
                  `https://my-dashboard-chi.vercel.app/subscriptions?plan=pro&uid=${user?.uid}&email=${user?.email}`
                );
              }}
              className="w-fit text-sm font-medium mt-5"
            >
              Let's Start
            </Button>
          )}
        </div>
        <div className="border border-slate-200 w-1/2 p-8 rounded-xl">
          <p className="text-gray-700 font-bold ">DashPRO</p>
          <p className="flex my-4 text-5xl font-semibold text-gray-500 relative">
            <span className="text-2xl font-normal">€</span>
            <span>0</span>
            <span className="text-2xl items-end mt-4 font-normal">/year</span>
          </p>
          <div className="flex flex-col gap-y-3 items-start">
            <p className="flex items-center  gap-x-3">
              <Check color="gray" size={16} /> 3 frames only
            </p>
            <p className="flex items-center  gap-x-3">
              <Check color="gray" size={16} /> Update once a day
            </p>
            <p className="flex items-center  gap-x-3">
              <Check color="gray" size={16} /> No email notifications
            </p>
          </div>
          {user?.plan !== "pro" ? (
            <Button
              disabled
              className="w-fit text-sm font-medium mt-5 bg-gray-200 text-gray-800"
            >
              Subscribed
            </Button>
          ) : (
            <Button
              onClick={() => {
                ipcRenderer.send(
                  "open-external-browser",
                  `https://billing.stripe.com/p/login/test_cN2aHR9N83qt36w6oo`
                );
              }}
              className="w-fit text-sm font-medium mt-5 bg-gray-200 text-gray-500 "
            >
              Start free version
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
