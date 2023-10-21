import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const Layout = () => {
  return (
    <main className=" w-full h-screen overflow-y-hidden bg-white">
      <Header />
      <div className="flex h-full pb-24">
        <Sidebar />

        <div className="h-full relative overflow-y-scroll bg-white  w-full rounded-ss-xl p-10 py-6 border-t border-l border-slate-400 ">
          {/* Dashboard */}
          <Outlet />
          {/* Dashboard */}
        </div>
      </div>
    </main>
  );
};
