import React from "react";

const UserPendingRequestCard = ({ connect }) => {
  return (
    <div className="w-full flex items-center justify-evenly bg-gray-800 border-t-2 border-b-2 border-gray-600">
      <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-500 overflow-hidden">
        <img src={connect.from.image} alt="user image" className="w-full" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{connect.from.name}</h1>
        <div className="w-full flex items-center justify-center gap-2">
          <button className="border-0 bg-blue-600 text-white px-2 py-1">
            Accept
          </button>
          <button className="border-0 bg-red-500 text-white px-2 py-1">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPendingRequestCard;
