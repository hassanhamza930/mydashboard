import React from "react";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { doc, getFirestore, setDoc } from "firebase/firestore";
//
import { auth } from "../config/firebase";

/**
 *
 * @param ipcRenderer
 * @param navigate
 */
export const handleGoogleSignIn = (ipcRenderer) => {
  ipcRenderer.send(
    "open-external-browser",
    "https://my-dashboard-chi.vercel.app/auth/firebase/google"
  );
};

/**
 *
 * @param ipcRenderer
 * @param navigate
 */
export const handleMicrosoftSignIn = (ipcRenderer) => {
  ipcRenderer.send(
    "open-external-browser",
    "https://my-dashboard-chi.vercel.app/auth/firebase/microsoft"
  );
};

/**
 *
 * @param ipcRenderer
 * @param navigate
 */
export const handleFacebookSignIn = (ipcRenderer) => {
  ipcRenderer.send(
    "open-external-browser",
    "https://my-dashboard-chi.vercel.app/auth/firebase/facebook"
  );
};

/**
 *
 * @param event
 * @param email
 * @param password
 * @param navigate
 */
export const handleLogin = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  e.preventDefault();

  await signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      if (user) {
        toast.success("Logged in successfully");
        const { uid } = user.user;
        localStorage.setItem("uid", uid);
        navigate("/dashboard");
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.code);
    });
};

/**
 *
 * @param event
 * @param name
 * @param email
 * @param password
 * @param navigate
 */
export const handleSignUp = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update the user's display name (name)
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    }

    const db = getFirestore();
    const { uid } = userCredential.user;
    // Use the UID as the name of the document
    const userDocRef = doc(db, "users", uid);

    // Set data in the document
    await setDoc(userDocRef, {
      uid: uid,
      name: name,
      email: email,
    })
      .then(() => {
        localStorage.setItem("uid", uid);
      })
      .catch((error) => {
        console.error(error);
        // toast.error(error.code);
      });

    toast.success("Account created successfully");
    navigate("/dashboard");
  } catch (error: any) {
    //console.log(error);
    toast.error(error.code);
  }
};
