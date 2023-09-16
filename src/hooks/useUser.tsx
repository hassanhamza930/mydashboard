import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { IUser } from "../types";

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (uid) {
      const db = getFirestore();

      const userDocRef = doc(db, "users", uid);

      // Fetch user data from Firestore
      getDoc(userDocRef)
        .then((docSnapshot) => {
          console.log("docSnapshot", docSnapshot);
          if (docSnapshot.exists()) {
            setUser(docSnapshot.data() as IUser);
          } else {
            setUser(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  return user;
};

export default useUser;
