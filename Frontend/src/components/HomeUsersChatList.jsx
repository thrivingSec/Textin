import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextingUser } from "../redux/userSlice";
import { IoSearch } from "react-icons/io5";

const HomeUsersChatList = () => {
  const { loginUser, textingUser, liveUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const users = loginUser.connection;

  return (
    <div
      className={`w-full h-full ${
        !textingUser ? "lg:w-1/4" : "hidden lg:block lg:w-1/4"
      } overflow-y-auto  text-white flex flex-col lg:border-r-2 border-gray-900`}
    >
      <div className="w-full mt-4 mb-4 px-2 relative">
        <input
          type="text"
          className="w-full outline-none px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-900"
          placeholder="John Doe"
        />
        <IoSearch className="absolute top-2 right-5 text-white size-5" />
      </div>
      {users?.map((user, index) => (
        <div
          className="w-full h-14 flex items-center hover:bg-gray-900 transition-all duration-300 cursor-pointer px-4 rounded-lg gap-4"
          onClick={(e) => {
            user.from._id === loginUser._id
              ? dispatch(setTextingUser(user.to))
              : dispatch(setTextingUser(user.from));
          }}
          key={index}
        >
          <div className="relative w-10 h-10 rounded-full border-2 border-gray-700 shadow-2xl shadow-gray-500 flex items-center justify-center">
            <div
              className={`${
                user.from._id === loginUser._id
                  ? liveUsers?.includes(user.to._id)
                    ? "absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500"
                    : "hidden"
                  : liveUsers?.includes(user.from._id)
                  ? "absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500"
                  : "hidden"
              }`}
            ></div>
            <img
              src={
                user.from._id === loginUser._id
                  ? user.to.image
                  : user.from.image
              }
              alt="user_image"
              className="w-full h-full rounded-full"
            />
          </div>
          <h1>
            {user.from._id === loginUser._id ? user.to.name : user.from.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default HomeUsersChatList;
