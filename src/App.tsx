import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      } else {
        setUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
