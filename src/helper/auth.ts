import React from "react";
import toast from "react-hot-toast";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
//
import { auth } from "../config/firebase";

/**
 *
 * @param ipcRenderer
 * @param navigate
 */
export const handleGoogleSignIn = (ipcRenderer, navigate) => {
  ipcRenderer.send(
    "open-external-browser",
    "https://my-dashboard-chi.vercel.app/auth/firebase/google"
  );

  ipcRenderer.on("token-channel", (event, token) => {
    if (token) {
      const credentials = GoogleAuthProvider.credential(token);
      CredentialSignIn(credentials, navigate);
    }
  });
};

/**
 *
 * @param ipcRenderer
 * @param navigate
 */
export const handleFacebookSignIn = (ipcRenderer, navigate) => {
  ipcRenderer.send(
    "open-external-browser",
    "https://my-dashboard-chi.vercel.app/auth/firebase/facebook"
  );

  ipcRenderer.on("token-channel", (event, token) => {
    if (token) {
      const credentials = FacebookAuthProvider.credential(token);
      CredentialSignIn(credentials, navigate);
    }
  });
};

/**
 *
 * @param credentials
 * @param navigate
 */
export function CredentialSignIn(credentials, navigate) {
  signInWithCredential(auth, credentials)
    .then(() => {
      toast.success("Logged in successfully");

      navigate("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.code);
    });
}

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
 * @param token
 * @param navigate
 */
export function SignInWithGoogle(token: string, navigate: NavigateFunction) {
  const credentials = GoogleAuthProvider.credential(token);

  signInWithCredential(auth, credentials)
    .then(() => {
      toast.success("Logged in successfully");

      navigate("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.code);
    });
}

/**
 *
 * @param token
 * @param navigate
 */
export function SignInWithFacebook(token: string, navigate: NavigateFunction) {
  const credentials = FacebookAuthProvider.credential(token);

  signInWithCredential(auth, credentials)
    .then(() => {
      toast.success("Logged in successfully");

      navigate("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.code);
    });
}

/**
 *
 * @param event
 * @param email
 * @param password
 * @param name
 * @param navigate
 */
export const handleSignUp = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  email: string,
  password: string,
  name: string,
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

    toast.success("Account created successfully");
    navigate("/dashboard");
  } catch (error: any) {
    console.log(error);
    toast.error(error.code);
  }
};
