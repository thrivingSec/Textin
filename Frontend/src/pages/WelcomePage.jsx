import React from "react";
import logo from "../assets/textin_logo.png";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-gradient-to-r from-pink-500/20 to-indigo-500/20 rounded-full blur-2xl animate-bounce"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-gray-800 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 shadow-2xl border border-gray-700">
        {/* Heading + Logo */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center sm:text-left">
          <div>
            <span className="block ml-10 text-2xl sm:text-3xl text-gray-200 ">
              Welcome to,
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl text-blue-500 font-semibold">
              Textin
            </span>
          </div>
          <div className="w-14 sm:w-16 mt-10">
            <img src={logo} alt="Textin Logo" className="w-full" />
          </div>
        </div>

        {/* Divider */}
        <hr className="w-4/5 mx-auto h-0.5 bg-gray-600" />

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-100 text-center tracking-wide">
          <span className="mx-1">Find</span> •{" "}
          <span className="mx-1">Connect</span> •{" "}
          <span className="mx-1">Text</span>
        </p>

        {/* Login Button */}
        <button
          className="w-full bg-blue-600 text-white rounded-lg py-3 mt-2 font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-md"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        {/* OR Divider */}
        <div className="w-full flex items-center gap-2">
          <span className="flex-1 h-0.5 bg-gray-500"></span>
          <span className="text-gray-300 text-sm">or</span>
          <span className="flex-1 h-0.5 bg-gray-500"></span>
        </div>

        {/* Signup Button */}
        <button
          className="w-full bg-gray-900 text-white rounded-lg py-3 font-medium hover:bg-gray-800 active:bg-gray-700 transition-all duration-300 shadow-md"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
