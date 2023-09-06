import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const Layout = () => {
  return (
    <main className="w-full h-full bg-lightgray">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="bg-white h-[100vh] w-full rounded-xl p-10 shadow-md">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
