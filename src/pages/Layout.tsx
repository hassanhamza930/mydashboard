import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const Layout = () => {
  return (
    <main className="w-full max-h-full min-h-[100vh] bg-bg-color">
      <Header />
      <div className="flex max-h-full min-h-[100vh]">
        <Sidebar />
        <div className="bg-white max-h-full min-h-[100vh] w-full rounded-xl p-10 shadow-md">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
