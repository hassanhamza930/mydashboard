import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const Layout = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        navigate("/");
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, [auth, navigate]);

  return (
    <main className="w-full max-h-full min-h-[100vh] bg-white">
      <Header />
      <div className="flex max-h-full min-h-[100vh]">
        <Sidebar />

        <div className="relative overflow-auto bg-white  w-full rounded-ss-xl p-10 py-6 border border-slate-300 ">
          {/* Dashboard */}

          <Outlet />

          {/* Dashboard */}
        </div>
      </div>
    </main>
  );
};
