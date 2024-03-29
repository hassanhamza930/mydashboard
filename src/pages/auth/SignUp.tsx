import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
//
import dashboardScreens from "../../assets/images/signupImg.png";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/icons/google.png";
import microsoftIcon from "../../assets/images/microsoft.png";
import facebookIcon from "../../assets/icons/facebook.png";
//
import {
  // SignInWithFacebook,
  // SignInWithGoogle,
  handleFacebookSignIn,
  handleGoogleSignIn,
  handleMicrosoftSignIn,
  handleSignUp,
} from "../../helper/auth";
import { useIpcRenderer } from "../../hooks/useIpcRederer";

export const SignUp = () => {
  // states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const ipcRenderer = useIpcRenderer();

  useEffect(() => {
    ipcRenderer.on("uid", (event, token) => {
      console.log("uid", token);
      if (token) {
        localStorage.setItem("uid", token);
        navigate("/dashboard");
      }
    });
  }, [navigate, ipcRenderer]);

  return (
    <section
      className="
        bg-bg-color  text-darkgray
        flex justify-center items-center    
        py-16 px-40 min-h-[100vh] max-h-[100%] 
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
        <div className="flex justify-between items-center flex-col w-[100%] lg:w-[50%] py-32  xl:px-40 bg-white rounded-2xl lg:rounded-e-2xl">
          <div className="flex justify-center items-center flex-col">
            <img src={logo} alt="logo" width={40} />
            <h2 className="font-semibold text-2xl my-5">Create Account</h2>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full p-4 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Name</label>
              <br />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                type="email"
              />
            </div>
            <div className="w-full p-4 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Email</label>
              <br />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type="email"
              />
            </div>
            <div className="w-full p-4 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Password</label>
              <br />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*************"
                type="password"
              />
            </div>

            <Button
              onClick={(e) => handleSignUp(e, name, email, password, navigate)}
              className="max-w-[300px] my-10"
            >
              Sign Up
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
                onClick={() => handleGoogleSignIn(ipcRenderer)}
                width={35}
                alt="google icon"
              />
              <img
                src={facebookIcon}
                className="cursor-pointer"
                onClick={() => handleFacebookSignIn(ipcRenderer)}
                width={35}
                alt="facebook icon"
              />
              <img
                src={microsoftIcon}
                className="cursor-pointer"
                onClick={() => handleMicrosoftSignIn(ipcRenderer)}
                width={35}
                alt="facebook icon"
              />
            </div>
          </div>
          <p className="mt-10 -mb-10">
            Already have an account?{" "}
            <Link
              className="
        text-primary
      "
              to="/"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
