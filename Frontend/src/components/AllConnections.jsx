import React from "react";
import { RiCloseFill } from "react-icons/ri";

const AllConnections = ({ handleShowConnects, connection, loginUserId }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={(e) => handleShowConnects(false)} // close on background click
    >
      <div
        className="bg-gray-800 p-6 rounded-2xl w-[90%] max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          All Connections
        </h2>
        {connection.length !== 0 &&
          connection.map((connect, index) => (
            <div
              className="w-full h-14 px-4 py-1 border-2 border-gray-700 bg-gray-900 flex items-center justify-start gap-4 rounded-lg"
              key={index}
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-2xl shadow-gray-500 overflow-hidden">
                <img
                  src={
                    connect.from._id === loginUserId
                      ? connect.to.image
                      : connect.from.image
                  }
                  alt="incoming user request"
                  className="w-full h-full"
                />
              </div>
              <h1 className="text-white text-xl font-semibold">
                {connect.from._id === loginUserId
                  ? connect.to.name
                  : connect.from.name}
              </h1>
            </div>
          ))}
        {connection.length === 0 && <div> No Connections Yet </div>}
        <div className="flex justify-end mt-5">
          <button className="" onClick={(e) => handleShowConnects(false)}>
            <RiCloseFill className="text-white size-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllConnections;
