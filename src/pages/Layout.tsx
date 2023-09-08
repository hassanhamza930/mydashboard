import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);
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
