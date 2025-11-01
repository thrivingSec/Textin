import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SendersText = ({ message, image }) => {
  const { loginUser } = useSelector((store) => store.user);

  const scroll = useRef();

  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  const imageOnLoadScroll = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex justify-end items-end">
      <div
        className="w-fit max-w-[75%] text-white bg-gray-950 px-3 py-2 rounded-lg rounded-br-none m-2"
        ref={scroll}
      >
        {image && (
          <img
            src={image}
            alt="sent"
            className="w-full max-w-[250px] mt-2 rounded-lg"
            onLoad={imageOnLoadScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>
      <div className="w-7 h-7 rounded-full overflow-hidden shadow-2xl shadow-gray-500">
        <img
          src={loginUser?.image}
          alt="login user image"
          className="w-full h-full"
        />
      </div>
      <div ref={scroll}></div>
    </div>
  );
};

export default SendersText;
