import React from "react";

const UserConnectionCard = ({ connect, loginUserId }) => {
  if (connect.from._id === loginUserId) {
    return (
      <div className="w-full flex items-center justify-evenly bg-gray-800 border-t-2 border-b-2 border-gray-600">
        <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-500 overflow-hidden">
          <img src={connect.to.image} alt="user image" className="w-full" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{connect.to.name}</h1>
          <p className="text-gray-400 text-md">{connect.to.createdAt}</p>
        </div>
      </div>
    );
  } else if (connect.to._id === loginUserId) {
    <div className="w-full flex items-center justify-evenly bg-gray-800 border-t-2 border-b-2 border-gray-600">
      <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-500 overflow-hidden">
        <img src={connect.from.image} alt="user image" className="w-full" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{connect.from.name}</h1>
        <p className="text-gray-400 text-md">{connect.from.createdAt}</p>
      </div>
    </div>;
  }
};

export default UserConnectionCard;
