import React, { useState } from "react";
import axios from "axios";
import { serverURL } from "../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserSearchResultCard = ({ user }) => {
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);

  const handleConnectionReq = async (e) => {
    e.preventDefault();
    try {
      setRequesting(true);
      setClicked(true);
      const res = await axios.put(
        `${serverURL}/api/user/connect?userId=${user._id}`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setRequesting(false);
    }
  };
  return (
    <div className="w-full sm:w-[200px] bg-gray-900 border-2 border-gray-400 rounded-lg m-1 p-2 flex flex-row sm:flex-col items-center justify-evenly  gap-4">
      <div className="w-[100px] h-[100px] rounded-full border-2 border-gray-400 shadow-2xl shadow-gray-500 flex items-center justify-center overflow-hidden">
        <img src={user.image} alt="user image" className="w-full" />
      </div>
      <div className="text-white text-xl font-semibold"> {user.name} </div>
      {user.connectionStatus === "none" ? (
        <form onSubmit={handleConnectionReq}>
          <button
            className={`${
              !clicked ? "bg-blue-600" : "bg-gray-800"
            } px-2 py-1 text-white rounded-lg border-0 cursor-pointer`}
          >
            {!clicked ? "Connect" : "Requested"}
          </button>
        </form>
      ) : user.connectionStatus === "requested" ? (
        <button
          className="bg-gray-800 px-2 py-1 text-white rounded-lg border-2 border-gray-400"
          disabled={true}
        >
          Requested
        </button>
      ) : user.connectionStatus === "connected" ? (
        <button
          className="bg-gray-800 px-2 py-1 text-white rounded-lg border-2 border-gray-400"
          disabled={true}
        >
          Connected
        </button>
      ) : (
        <button
          className="bg-gray-800 px-2 py-1 text-white rounded-lg border-2 border-gray-400"
          disabled={true}
        >
          Received
        </button>
      )}
    </div>
  );
};

export default UserSearchResultCard;
