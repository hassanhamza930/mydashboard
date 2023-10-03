import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { IUser } from "../types";

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const uid = authUser.uid;
        const userDocRef = doc(db, "users", uid);

        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUser(docSnapshot.data() as IUser);
          } else {
            setUser(null);
          }
        });

        return () => {
          unsubscribeSnapshot();
        };
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return user;
};

export default useUser;
