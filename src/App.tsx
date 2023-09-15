import { Routes, Route, HashRouter } from "react-router-dom";
import { Home, Layout, Login, SignUp } from "./pages";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(localStorage.getItem("oauthToken"));

  const token = localStorage.getItem("oauthToken");
  useEffect(() => {
    // const token = localStorage.getItem("oauthToken");
    console.log("token app useEffect", token);
    if (token) {
      setUser(token);
    } else {
      setUser(null);
    }
  }, [token]);
  return (
    <>
      <HashRouter>
        <Routes>
          {!token && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>

          <Route
            path="*"
            element={token ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
