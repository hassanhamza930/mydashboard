import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-hot-toast";
//
import dashboardScreens from "../../assets/images/dashboardScreens.png";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/icons/google.png";
// import facebookIcon from "../../assets/icons/facebook.png";
//
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { auth } from "../../config/firebase";
// import {
//   // handleFacebookSignIn,
//   loginWithGoogle,
// } from "../../helper/firebaseAuth";
// // import { useGoogleLogin } from "@react-oauth/google";

export const Login = () => {
  const navigate = useNavigate();

  const ipcRenderer = (window as any).ipcRenderer;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
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

  const handleGoogleSignIn = () => {
    ipcRenderer.send("open-external-browser");

    ipcRenderer.on("token-channel", (event, token) => {
      if (token) {
        console.log(token);
        // Call your signInWithGoogle function with the received token
        SignInWithGoogle(token);
      }
    });
  };

  ipcRenderer.on("oauthIdToken", (event, token) => {
    if (token) {
      console.log(token);
      // Call your signInWithGoogle function with the received token
      SignInWithGoogle(token);
    }
  });

  function SignInWithGoogle(token: string) {
    const credentials = GoogleAuthProvider.credential(token);

    signInWithCredential(auth, credentials)
      .then(() => {
        toast.success("Logged in successfully");

        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section
      className="
    bg-bg-color h-[100vh] min-h-[100%]  text-darkgray
    flex justify-center items-center    
    py-16 px-40 
    "
    >
      <div className="flex w-full h-full shadow-md rounded-2xl ">
        <div className="bg-primary hidden lg:flex justify-center items-center flex-col w-full  md:w-[50%] rounded-s-2xl ">
          <h1
            className="
            mb-28
            font-medium 
            text-white 
            text-6xl 
            text-center
            leading-[72px]
            "
          >
            Organize your <br /> information
          </h1>
          <img
            className="w-[400px] mx-auto"
            src={dashboardScreens}
            alt="dashboard screens"
          />
        </div>
        <div className="flex justify-between items-center flex-col w-[100%] lg:w-[50%] py-32  xl:px-40 bg-white  rounded-xl lg:rounded-e-xl">
          <div className="w-full flex flex-col justify-center items-center">
            <img src={logo} alt="logo" width={40} />
            <h2 className="font-semibold text-2xl my-5">Login</h2>
          </div>
          <form className="w-full flex flex-col justify-center items-center">
            <div className="w-full p-5 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Email</label>
              <br />
              <Input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type="email"
              />
            </div>
            <div className="w-full p-5 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Password</label>
              <br />
              <Input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*************"
                type="password"
              />
            </div>

            <Button
              type="submit"
              onClick={handleLogin}
              className="max-w-[300px] my-10"
            >
              Log in
            </Button>

            <div className="flex justify-center items-center gap-3 w-full">
              <div className="w-1/4 bg-darkgray h-[1px] opacity-40" />
              <h4>or continue with</h4>
              <div className="w-1/4 bg-darkgray h-[1px] opacity-40" />
            </div>

            <div className="flex gap-5 py-4">
              <img
                src={googleIcon}
                className="cursor-pointer"
                onClick={handleGoogleSignIn}
                width={35}
                alt="google icon"
              />
              {/* <img
                src={facebookIcon}
                className="cursor-pointer"
                onClick={() =>
                  handleFacebookSignIn()
                    .then((user) => {
                      if (user) {
                        toast.success("Logged in successfully");
                        navigate("/dashboard");
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                      toast.error(error.code);
                    })
                }
                width={35}
                alt="facebook icon"
              /> */}
            </div>
          </form>
          <p className="mt-10 -mb-10">
            Don't have an account?{" "}
            <Link
              className="
            text-primary
          "
              to="/signup"
            >
              Create free account
            </Link>
            {/* <button onClick={handleGoogleSignIn}>Open External Webpage</button> */}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
