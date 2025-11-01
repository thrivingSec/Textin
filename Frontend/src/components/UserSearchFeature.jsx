import axios from "axios";
import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { serverURL } from "../main";
import UserSearchResultCard from "./UserSearchResultCard";

const UserSearchFeature = () => {
  const search = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${serverURL}/api/user/search?query=${search.current.value
          .toString()
          .trim()}`,
        { withCredentials: true }
      );
      if (res.data.userResult.length === 0) {
        setNoUserFound(true);
      } else {
        setNoUserFound(false);
        setUserResult(res.data.userResult);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [noUserFound, setNoUserFound] = useState(false);

  const [userResult, setUserResult] = useState(null);

  return (
    <div className="w-full h-full overflow-auto mt-10">
      {/* search box */}
      <form
        className="relative w-[50%] rounded-md mx-auto border-2 border-gray-400 hover:shadow-2xl hover:shadow-gray-400 transition-all duration-300 overflow-hidden"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full h-full px-4 py-1 text-white border-0 outline-none"
          placeholder="John Doe"
          ref={search}
        />
        <button className="absolute right-2 top-1 cursor-pointer">
          <IoSearch className=" text-white size-5 " />
        </button>
      </form>
      <div className="w-full px-1 lg:px-4 flex flex-1 items-start justify-start overflow-y-auto mt-4">
        {noUserFound ? (
          <div className="w-full flex justify-center items-center">
            <div className="text-2xl font-semibold text-white">
              No user found
            </div>
          </div>
        ) : userResult ? (
          <div className="w-full">
            {userResult.map((user, index) => (
              <UserSearchResultCard key={index} user={user} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserSearchFeature;
