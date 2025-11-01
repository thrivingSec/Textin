import React, { useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { FaCamera } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { serverURL } from "../main.jsx";
import { setLoginUser } from "../redux/userSlice.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserConnectionCard from "../components/UserConnectionCard.jsx";
import UserPendingRequestCard from "../components/UserPendingRequestCard.jsx";
import AllConnections from "../components/AllConnections.jsx";
import AllRequests from "../components/AllRequests.jsx";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { loginUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(loginUser.name);

  const image = useRef();

  const [frontendImage, setFrontendImage] = useState(dp);
  const [backendImage, setBackendImage] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);

  const [showConnects, setShowConnects] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfileUpdate = async (e) => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append("name", name);
      if (backendImage) formData.append("image", backendImage);
      const res = await axios.put(`${serverURL}/api/user/profile`, formData, {
        withCredentials: true,
      });
      dispatch(setLoginUser(res.data));
      toast.success("Profile updated");
    } catch (error) {
      toast(error.response.data.message);
      console.log("Error in handleProfileUpdate :: ", error);
    } finally {
      setIsUpdating(false);
    }
  };
  if (!loginUser) {
    return <div>Loading State</div>;
  }
  return (
    <div className="relative w-full h-screen bg-gray-900 p-8 sm:p-8 flex justify-center">
      {/* blur effect */}
      <div className="-top-32 -left-32 w-[400px] h-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl rounded-full animate-pulse absolute"></div>
      {/* profile container */}
      {!showConnects && !showRequests && (
        <div className="relative w-full max-w-2xl px-2 lg:px-4 py-6 lg:py-8 border-2 border-gray-700 bg-gray-800 rounded-lg shadow-2xl flex flex-col items-center gap-4">
          {/* profile image */}
          <div className="relative w-[200px] h-[200px] border-2 border-gray-900 rounded-full shadow-2xl shadow-gray-600 flex items-center justify-center">
            <div className="w-full h-full overflow-hidden rounded-full flex items-center justify-center">
              <img
                src={loginUser.image ? loginUser.image : frontendImage}
                alt="profile image"
                className="w-full"
              />
            </div>
            <FaCamera
              className="absolute bottom-0 right-10 w-[40px] h-[30px] cursor-pointer active:text-gray-500 transition-all duration-300"
              onClick={(e) => image.current.click()}
            />
            {/* hidden imput field for image upload */}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={image}
              onChange={handleImage}
            />
          </div>

          <FaUserPlus
            className="absolute top-2 right-2 size-7 text-white border-1 border-white p-1 rounded-md"
            onClick={(e) => setShowRequests(true)}
          />
          <div
            className="absolute top-2 right-10 h-7 text-white border-1 border-white px-2 rounded-md cursor-pointer"
            onClick={(e) => navigate("/home")}
          >
            Home
          </div>

          {/* name */}
          <div className="w-full flex justify-center">
            <div className="w-[250px]">
              <div className="flex items-center gap-1">
                <FaUserAlt className="text-white size-3 ml-1" />{" "}
                <span className="text-white">Name</span>
              </div>
              <input
                type="text"
                className=" bg-gray-900 text-white px-2 py-1 outline-none border-2 border-gray-700 flex justify-start rounded-lg w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* followers/following */}
          <div className="w-full flex justify-center">
            <div
              className="w-[250px] bg-gray-900 border-2 border-gray-700 rounded-lg p-1 text-white font-semibold flex justify-center"
              onClick={(e) => setShowConnects(true)}
            >
              Connections{" "}
              {loginUser.connection ? loginUser.connection.length : 0}
            </div>
          </div>
          {/* email */}
          <div className="w-full flex justify-center">
            <div className="w-[250px]">
              <div className="flex items-center gap-1">
                <MdOutlineMail className="text-white size-5 ml-1" />{" "}
                <span className="text-white">Email</span>
              </div>
              <div className="bg-gray-900 flex justify-start px-2 py-1 border-2 border-gray-700 rounded-lg text-gray-400">
                {loginUser.email}
              </div>
            </div>
          </div>
          {/* created at */}
          <div className="w-full flex items-center justify-center">
            <div className="w-[250px]">
              <div className="flex items-center gap-1">
                <CiTimer className="text-white size-5 ml-1" />{" "}
                <span className="text-white">Created-At</span>
              </div>
              <div className="bg-gray-900 flex justify-start px-2 py-1 border-2 border-gray-700 rounded-lg text-gray-400">
                {loginUser.createdAt.split("T")[0]}
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-[10px]">
            <button className="w-[120px] text-white p-1 bg-gray-900 border-2 border-gray-700 rounded-lg hover:bg-red-500 active:bg-red-700 cursor-pointer transition-all duration-300">
              Delete
            </button>
            <button
              className="w-[120px] text-white p-1 bg-gray-900 border-2 border-gray-700 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300 active:bg-gray-800"
              onClick={(e) => handleProfileUpdate()}
              disabled={isUpdating ? true : false}
            >
              {isUpdating ? "Updating.." : "Update"}
            </button>
          </div>
        </div>
      )}
      {showConnects && !showRequests && (
        <AllConnections
          handleShowConnects={setShowConnects}
          connection={loginUser.connection}
          loginUserId={loginUser._id}
        />
      )}
      {!showConnects && showRequests && (
        <AllRequests
          handleShowRequests={setShowRequests}
          pending={loginUser.pending}
        />
      )}
    </div>
  );
};

export default ProfilePage;
