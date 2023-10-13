import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const Layout = () => {
  return (
    <main className=" w-full max-h-full min-h-[100vh] bg-white">
      <Header />
      <div className="flex max-h-full min-h-[100vh]">
        <Sidebar />

        <div className="overflow-auto min-h-full relative bg-white  w-full rounded-ss-xl p-10 py-6 border-t border-l border-slate-400 ">
          {/* Dashboard */}

          <Outlet />

          {/* Dashboard */}
        </div>
      </div>
    </main>
  );
};
