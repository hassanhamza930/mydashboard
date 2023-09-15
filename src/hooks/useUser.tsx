import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Assuming you have already initialized Firebase and Firestore

// Custom hook to fetch user data from Firestore by UID
const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem("oauthToken");

    if (uid) {
      const db = getFirestore();

      const userDocRef = doc(db, "users", uid);

      // Fetch user data from Firestore
      getDoc(userDocRef)
        .then((docSnapshot) => {
          console.log("docSnapshot", docSnapshot);
          if (docSnapshot.exists()) {
            setUser(docSnapshot.data());
          } else {
            // Handle the case where the user document does not exist
            setUser(null);
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch
          console.error("Error fetching user data:", error);
          setUser(null);
        });
    } else {
      // Handle the case where there is no UID in localStorage
      setUser(null);
    }
  }, []);

  return user;
};

export default useUser;
