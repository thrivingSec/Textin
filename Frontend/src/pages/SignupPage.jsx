import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/textin_logo.png";
import toast from "react-hot-toast";
import axios from "axios";
import { serverURL } from "../main";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: null,
    email: null,
    password: null,
  });

  const [signingUp, setSigningUp] = useState(false);

  const formValidator = (data) => {
    if (!data.name.trim()) return toast.error("Name is required");
    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.trim().length < 6)
      return toast.error("Password must be at least 6 character long");
    if (!data.email.trim()) return toast.error("email is required");
    if (!/\S+@\S+\.\S+/.test(data.email))
      return toast.error("Invalid email format");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const validtion = formValidator(formData);
      if (validtion === true) {
        setSigningUp(true);
        const res = await axios.post(
          `${serverURL}/api/auth/signup`,
          { ...formData },
          { withCredentials: true }
        );
        setSigningUp(false);
        if (res.data.success === true) {
          navigate("/otp");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const [viewPass, setViewPass] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gray-900 p-8 sm:p-8">
      {/* blur effect */}
      <div className="absolute -top-32 -left-32 h-[400px] w-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
      {/* main card */}
      <div className="relative max-w-7xl mx-auto bg-gray-800 border-2 border-gray-700 rounded-2xl p-8 sm:p-8 shadow-2xl z-10">
        <div className="w-full flex">
          {/* left signup section */}
          <div className="w-full md:w-[30%] flex flex-col items-center justify-center gap-4 p-2 md:border-r-2 border-white">
            <span className="text-white text-3xl sm:text-4xl">Signup</span>
            {/* input form */}
            <form
              className="text-white w-full p-2 flex flex-col gap-5 items-center"
              onSubmit={handleSignup}
            >
              {/* name input field */}
              <div className="w-full flex flex-col items-start gap-2">
                <span className="text-white ml-1 font-bold">Name</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full py-2 px-3 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData.name ? formData.name : ""}
                />
              </div>
              {/* email input field */}
              <div className="w-full flex flex-col items-start gap-2">
                <span className="text-white ml-1 font-bold">Email</span>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  required
                  className="w-full py-2 px-3 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email ? formData.email : ""}
                />
              </div>
              {/* passowrd input field */}
              <div className="w-full flex flex-col items-start gap-2 relative">
                <div
                  className="absolute right-2 top-[45px] w-7 h-7 text-gray-200"
                  onClick={(e) => setViewPass(!viewPass)}
                >
                  {!viewPass ? <FaEye /> : <FaEyeSlash />}
                </div>
                <span className="text-white ml-1 font-bold">Password</span>
                <input
                  type={`${viewPass ? "text" : "password"}`}
                  placeholder="Password"
                  required
                  className="w-full py-2 px-3 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password ? formData.password : ""}
                />
              </div>
              <button className="w-full bg-blue-600 text-white rounded-lg py-3 mt-2 font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-md cursor-pointer">
                {signingUp ? "Sending Data ... " : "Signup"}
              </button>
              <div className="w-full p-2 flex justify-center">
                <p className="text-sm text-white">
                  Already have an account?{" "}
                  <Link
                    className="text-sm font-semibold text-blue-600"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
          {/* right image section */}
          <div className="hidden md:flex w-[70%] flex-col justify-center">
            <div className="p-2 overflow-hidden rounded-2xl flex items-center justify-center">
              <img
                src={logo}
                alt="texting_logo"
                className="w-[300px] h-[300px] animate-pulse transition-all duration-300"
              />
            </div>
            <Link
              to={"/"}
              className="text-7xl font-semibold text-blue-600 flex justify-center"
            >
              Textin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
