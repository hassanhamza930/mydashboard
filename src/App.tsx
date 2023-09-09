import { Routes, Route, HashRouter } from "react-router-dom";
import { Home, Layout, Login, SignUp } from "./pages";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { User } from "firebase/auth";
import { Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log("logedin", user);
      } else {
        setUser(null);
      }
    });
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
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
            <Route path="/dashboard" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
