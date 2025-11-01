import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ReceiversText = ({ message, image }) => {
  const { textingUser } = useSelector((store) => store.user);

  const scroll = useRef();

  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  }, [message, image]);

  const imageOnLoadScroll = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex justify-start items-start">
      <div className="w-7 h-7 rounded-full overflow-hidden shadow-2xl shadow-gray-500">
        <img
          src={textingUser?.image}
          alt="login user image"
          className="w-full h-full"
        />
      </div>
      <div
        className="w-fit max-w-[75%] text-white bg-gray-950 px-3 py-2 rounded-lg rounded-tr-none m-2"
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
    </div>
  );
};

export default ReceiversText;
