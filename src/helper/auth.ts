import React from "react";
import toast from "react-hot-toast";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
//
import { auth } from "../config/firebase";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

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
export const handleMicrosoftSignIn = (ipcRenderer, navigate) => {
  ipcRenderer.send(
    "open-external-browser",
    "https://my-dashboard-chi.vercel.app/auth/firebase/microsoft"
  );

  ipcRenderer.on("token-channel", async (event, token) => {
    if (token) {
      try {
        const provider = new OAuthProvider("microsoft.com");
        const credentials = provider.credential({
          idToken: token,
          // accessToken: token,
        });
        await CredentialSignIn(credentials, navigate);
      } catch (error) {
        console.error("Error handling Microsoft sign-in:", error);
      }
    } else {
      console.error("Received invalid or missing Microsoft token.");
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
  // //console.log("credentials", credentials);
  signInWithCredential(auth, credentials)
    .then(() => {
      // toast.success("Logged in successfully");

      navigate("/dashboard");
    })
    .catch((error) => {
      //console.log(error);
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
        const { uid } = user.user;
        localStorage.setItem("oauthToken", uid);
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
      //console.log(error);
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
      //console.log(error);
      toast.error(error.code);
    });
}

/**
 *
 * @param token
 * @param navigate
 */
export async function SignInWithMicrosoft(token) {
  try {
    // Create an OAuth provider for Microsoft.
    const provider = new OAuthProvider("microsoft.com");

    // Set the OAuth ID token directly (without using accessToken).
    provider.setCustomParameters({
      id_token: token,
    });

    // Sign in with the credential.
    const credential = provider.credential({
      idToken: token,
    });

    const userCredential = await signInWithCustomToken(
      auth,
      credential.accessToken
    );
    const user = userCredential.user;

    // Now, you have signed in the user with Microsoft OAuth.
    console.log("User signed in:", user);

    return user; // You can return the user object if needed.
  } catch (error) {
    console.error("Error signing in with Microsoft OAuth token:", error);
    throw error;
  }
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
        localStorage.setItem("oauthToken", uid);
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
