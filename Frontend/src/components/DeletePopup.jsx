import React from "react";

const DeletePopup = ({ handleDeletePopup, handleDeleteAccount }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={(e) => handleDeletePopup(false)}
    >
      <div
        className="bg-gray-800 p-6 rounded-2xl w-[90%] max-w-md shadow-xl flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-white align-middle">
          Are you sure?
        </h2>
        <div className="flex items-center justify-center gap-4">
          <button
            className=" text-white px-2 py-1  rounded-lg cursor-pointer bg-red-600 transition-all duration-300 active:bg-gray-800"
            onClick={(e) => handleDeleteAccount()}
          >
            Yes
          </button>
          <button
            className=" text-white px-2 py-1  rounded-lg cursor-pointer bg-green-600 transition-all duration-300 active:bg-gray-800"
            onClick={(e) => handleDeletePopup(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
