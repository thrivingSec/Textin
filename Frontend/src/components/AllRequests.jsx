import axios from "axios";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { serverURL } from "../main";
import toast from "react-hot-toast";

const AllRequests = ({ handleShowRequests, pending }) => {
  const handleAccept = async (e, userId) => {
    e.preventDefault();
    try {
      const req = await axios.put(
        `${serverURL}/api/user/accept?userId=${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Request Accepted");
      handleShowRequests(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleReject = async (e, userId) => {
    e.preventDefault();
    try {
      const req = await axios.put(
        `${serverURL}/api/user/reject?userId=${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Request Rejected");
      handleShowRequests(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={(e) => handleShowRequests(false)} // close on background click
    >
      <div
        className="bg-gray-800 p-6 rounded-2xl w-[90%] max-w-md shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          Pending Requests
        </h2>
        {pending.length !== 0 &&
          pending.map((user, index) => (
            <div
              className="w-full h-14 px-4 py-1 border-2 border-gray-700 bg-gray-900 flex items-center justify-start gap-4 rounded-lg"
              key={index}
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-2xl shadow-gray-500 overflow-hidden">
                <img
                  src={user.from.image}
                  alt="incoming user request"
                  className="w-full h-full"
                />
              </div>
              <h1 className="text-white text-xl font-semibold">
                {user.from.name}
              </h1>
              <div className="flex flex-1 items-center justify-center gap-2">
                <button
                  className="border-2 border-gray-700 bg-blue-500 rounded-md px-2 py-1 cursor-pointer active:bg-blue-700 transition-all duration-300 text-white hover:bg-blue-600"
                  onClick={(e) => {
                    handleAccept(e, user.from._id);
                  }}
                >
                  Accept
                </button>

                <button
                  className="border-2 border-gray-700 bg-red-600 rounded-md px-2 py-1 cursor-pointer active:bg-red-800 transition-all duration-300 text-white hover:bg-red-700"
                  onClick={(e) => {
                    handleReject(e, user.from._id);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        <div className="flex justify-end mt-5">
          <button className="" onClick={(e) => handleShowRequests(false)}>
            <RiCloseFill className="text-white size-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllRequests;
