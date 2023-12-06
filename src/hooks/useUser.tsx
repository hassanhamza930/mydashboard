import { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { IUser } from "../types";

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (uid) {
      const db = getFirestore();

      const userDocRef = doc(db, "users", uid);

      // Subscribe to real-time updates with onSnapshot
      const unsubscribe = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUser(docSnapshot.data() as IUser);
          } else {
            setUser(null);
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      );

      // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
    } else {
      setUser(null);
    }
  }, []);

  return user;
};

export default useUser;
