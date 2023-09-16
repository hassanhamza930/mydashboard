import { Routes, Route, HashRouter } from "react-router-dom";
import { Dashboard, Layout, Login, SignUp } from "./pages";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    console.log("uid app useEffect", uid);
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
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="*"
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
