import { Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
//
import { Dashboard, Group, Layout, Login, SignUp } from "./pages";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { IUser } from "./types";

function App() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser: any) => {
      if (authUser) {
        setUser(authUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }
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
