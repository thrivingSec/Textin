import React, { useState } from "react";
import logo from "../assets/textin_logo.png";
import { AiFillWechat } from "react-icons/ai";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import UserSearchFeature from "../components/UserSearchFeature";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { setLoginUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { getLoginUser } from "../utils/getLoginUser";
import HomeUsersChatList from "../components/HomeUsersChatList";
import HomeUsersChatArea from "../components/HomeUsersChatArea";
import { getConversation } from "../utils/getConversations";
import LogoutPoupup from "../components/LogoutPopup";

const HomePage = () => {
  getLoginUser();
  getConversation();
  const [searching, setSearching] = useState(false);
  const [texting, setTexting] = useState(true);
  const [logout, setLogout] = useState(false);
  const { loginUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      const res = await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setLoginUser(null));
      toast.success("Loging Out!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      {/* navigation */}
      <nav className="w-full p-2">
        <div className="w-[25px] h-[25px] flex items-center gap-2">
          <img src={logo} alt="textin_logo" className="w-full h-full" />
          <span className="text-blue-600 font-semibold">Textin</span>
        </div>
        {/* nav bar visible only in small screen */}
        <div className="lg:hidden w-full">
          <div className="w-full flex items-center justify-evenly">
            <div className="p-2">
              <AiFillWechat
                className="size-7 text-gray-200"
                onClick={(e) => {
                  setSearching(false);
                  setTexting(true);
                }}
              />
            </div>
            <div
              className="p-2 cursor-pointer"
              onClick={(e) => {
                setSearching(true);
                setTexting(false);
              }}
            >
              <MdOutlineManageSearch className="size-7 text-gray-200" />
            </div>
            <div
              className="w-7 h-7 rounded-full border-2 border-gray-600 shadow-2xl shadow-gray-500 overflow-hidden cursor-pointer flex items-center justify-center"
              onClick={(e) => navigate("/profile")}
            >
              <img
                src={loginUser.image}
                alt="login user image"
                className="w-full"
              />
            </div>
            <div className="size-7 rounded-full border-2 border-gray-600 shadow-2xl shadow-gray-500 overflow-hidden cursor-pointer flex items-center justify-center">
              <IoArrowBackCircleOutline
                className="text-white w-full h-full"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full h-full flex justify-end py-2">
        {/* sidebar */}
        <div className="hidden lg:flex flex-col items-center justify-between w-[3%] h-full pl-2 ">
          {/* top */}
          <div className="w-full flex flex-col">
            <div
              className={`w-full mt-5 cursor-pointer ${
                texting ? "border-r-3 border-blue-600" : ""
              } py-1`}
            >
              <AiFillWechat
                className="size-7 text-gray-200"
                onClick={(e) => {
                  setSearching(false);
                  setTexting(true);
                }}
              />
            </div>
            <div
              className={`w-full mt-5 cursor-pointer ${
                searching ? "border-r-3 border-blue-600" : ""
              } py-1`}
            >
              <MdOutlineManageSearch
                className="size-7 text-gray-200"
                onClick={(e) => {
                  setSearching(true);
                  setTexting(false);
                }}
              />
            </div>
          </div>
          {/* bottom */}
          <div className="w-full flex flex-col gap-4">
            <div
              className="w-7 h-7 rounded-full border-2 border-gray-600 shadow-2xl shadow-gray-500 overflow-hidden cursor-pointer flex items-center justify-center"
              onClick={(e) => navigate("/profile")}
            >
              <img
                src={loginUser.image}
                alt="login user image"
                className="w-full"
              />
            </div>
            <div className="size-7 rounded-full border-2 border-gray-600 shadow-2xl shadow-gray-500 overflow-hidden cursor-pointer flex items-center justify-center">
              <IoArrowBackCircleOutline
                className="text-white w-full h-full"
                onClick={(e) => {
                  setTexting(false);
                  setSearching(false);
                  setLogout(true);
                }}
              />
            </div>
          </div>
        </div>
        {/* main container */}
        <div className="w-full sm:w-[97%] h-full bg-gray-800 rounded-lg">
          {searching && <UserSearchFeature />}
          {texting && (
            <div className="w-full h-full lg:flex ">
              <HomeUsersChatList />
              <HomeUsersChatArea />
            </div>
          )}
          {logout && (
            <LogoutPoupup
              handleLogoutPopup={setLogout}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
