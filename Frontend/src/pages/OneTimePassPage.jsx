import React, { useState } from "react";
import logo from "../assets/textin_logo.png";
import toast from "react-hot-toast";
import axios from "axios";
import { serverURL } from "../main";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const OneTimePassPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpFormInput, setOtpFormInput] = useState({
    val1: null,
    val2: null,
    val3: null,
    val4: null,
    val5: null,
  });

  const [verifying, setVerifying] = useState(false);

  const otpValidator = (data) => {
    const otp = data.val1 + data.val2 + data.val3 + data.val4 + data.val5;
    if (otp.trim().length === 5) {
      return otp.trim();
    } else {
      toast.error("enter valid OTP");
      return false;
    }
  };

  const otpVerification = async (e) => {
    e.preventDefault();
    try {
      setVerifying(true);
      const validation = otpValidator(otpFormInput);
      if (validation !== false) {
        const res = await axios.post(
          `${serverURL}/api/auth/verify`,
          { code: validation },
          { withCredentials: true }
        );
        dispatch(setLoginUser(res.data));
        toast.success("Email verified!");
      }
      setVerifying(false);
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 p-8 sm:p-8 flex justify-center items-center">
      {/* blur effect */}
      <div className="absolute -top-32 -left-32 h-[400px] w-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
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

        {/* otp input field */}
        <form className="w-full flex flex-col gap-4" onSubmit={otpVerification}>
          <div className="w-full flex flex-col gap-2">
            <h2 className="w-full flex justify-center text-white font-semibold">
              OTP sent on
            </h2>
            <h2 className="w-full flex justify-center text-blue-600 font-semibold">
              Registered Email
            </h2>
          </div>
          <div className="w-full flex justify-center gap-0.5 sm:gap-2">
            <input
              type="text"
              maxLength={1}
              className="w-8 pl-3 py-1 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg font-bold text-white"
              onChange={(e) =>
                setOtpFormInput({ ...otpFormInput, val1: e.target.value })
              }
              value={otpFormInput.val1 ? otpFormInput.val1 : ""}
            />
            <input
              type="text"
              maxLength={1}
              className="w-8 pl-3 py-1 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg font-bold text-white"
              onChange={(e) =>
                setOtpFormInput({ ...otpFormInput, val2: e.target.value })
              }
              value={otpFormInput.val2 ? otpFormInput.val2 : ""}
            />
            <input
              type="text"
              maxLength={1}
              className="w-8 pl-3 py-1 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg font-bold text-white"
              onChange={(e) =>
                setOtpFormInput({ ...otpFormInput, val3: e.target.value })
              }
              value={otpFormInput.val3 ? otpFormInput.val3 : ""}
            />
            <input
              type="text"
              maxLength={1}
              className="w-8 pl-3 py-1 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg font-bold text-white"
              onChange={(e) =>
                setOtpFormInput({ ...otpFormInput, val4: e.target.value })
              }
              value={otpFormInput.val4 ? otpFormInput.val4 : ""}
            />
            <input
              type="text"
              maxLength={1}
              className="w-8 pl-3 py-1 bg-gray-700 border-blue-700 border-2 shadow-2xl outline-none rounded-lg font-bold text-white"
              onChange={(e) =>
                setOtpFormInput({ ...otpFormInput, val5: e.target.value })
              }
              value={otpFormInput.val5 ? otpFormInput.val5 : ""}
            />
          </div>
          {/* otp submit Button */}
          <button className="w-full bg-blue-600 text-white rounded-lg py-3 mt-2 font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-md">
            {verifying ? "verifying ..." : "verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OneTimePassPage;
