import { Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
//
import { Dashboard, Group, Layout, Login, SignUp } from "./pages";

function App() {
  const [user, setUser] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setUser(uid);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <HashRouter>
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/group/:id" element={<Group />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
