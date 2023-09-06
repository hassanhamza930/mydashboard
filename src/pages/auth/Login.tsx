import { Link } from "react-router-dom";
//
import dashboardScreens from "../../assets/images/dashboardScreens.png";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
//
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export const Login = () => {
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
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full p-5 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Email</label>
              <br />
              <Input placeholder="abc@gmail.com" type="email" />
            </div>
            <div className="w-full p-5 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Password</label>
              <br />
              <Input placeholder="*************" type="password" />
            </div>

            <Button className="max-w-[300px] my-10">Log in</Button>

            <div className="flex justify-center items-center gap-3 w-full">
              <div className="w-1/4 bg-darkgray h-[1px] opacity-40" />
              <h4>or continue with</h4>
              <div className="w-1/4 bg-darkgray h-[1px] opacity-40" />
            </div>

            <div className="flex gap-5 py-4">
              <img src={googleIcon} width={35} alt="google icon" />
              <img src={facebookIcon} width={35} alt="facebook icon" />
            </div>
          </div>
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
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
