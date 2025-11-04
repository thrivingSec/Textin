import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setTextingUser } from "../redux/userSlice";
import { GrEmoji } from "react-icons/gr";
import { TiDocumentText } from "react-icons/ti";
import { GrSend } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import dp from "../assets/dp.webp";
import axios from "axios";
import { serverURL } from "../main";
import { setText } from "../redux/messageSlice.js";
import toast from "react-hot-toast";
import SendersText from "./SendersText.jsx";
import ReceiversText from "./ReceiversText.jsx";
import { getSocket } from "../socketIO/socket.js";

const HomeUsersChatArea = () => {
  const { textingUser, loginUser } = useSelector((store) => store.user);
  const { text } = useSelector((store) => store.messages);
  const dispatch = useDispatch();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [inputText, setInputText] = useState(null);

  const [frontEndImage, setFrontEndImage] = useState(null);
  const [backEndImage, setBaclEndImage] = useState(null);

  const image = useRef();

  const [sendingMsg, setSendingMsg] = useState(false);

  const [typing, setTyping] = useState(false);

  const handleEmojiPicker = (emojiObject) => {
    setInputText(inputText + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBaclEndImage(file);
    setFrontEndImage(URL.createObjectURL(file));
  };

  const handleTyping = (e) => {
    setInputText(e.target.value);
    let socket = getSocket();
    socket.emit("typing", {
      receiverId: textingUser._id,
      isTyping: e.target.value.length > 0,
    });
  };

  const handleSendChat = async (e) => {
    try {
      setSendingMsg(true);
      let socket = getSocket();
      const newForm = new FormData();
      newForm.append("message", inputText);
      if (backEndImage) {
        newForm.append("image", backEndImage);
      }
      const res = await axios.post(
        `${serverURL}/api/message/send/${textingUser._id}`,
        newForm,
        { withCredentials: true }
      );
      dispatch(setText([...text, res.data]));
      socket.emit("typing", {
        receiverId: textingUser._id,
        isTyping: false,
      });
      setInputText("");
      setBaclEndImage(null);
      setFrontEndImage(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSendingMsg(false);
    }
  };

  useEffect(() => {
    let socket = getSocket();
    socket.on("newMessage", (newText) => {
      dispatch(setText([...text, newText]));
    });
    socket.on("typing", ({ from, isTyping }) => {
      setTyping(isTyping);
    });
    return () => {
      socket.off();
    };
  }, [text, setText]);

  return (
    <div
      className={`w-full h-full ${
        textingUser ? "lg:w-3/4" : "hidden lg:w-3/4"
      } text-white px-2 relative overflow-hidden`}
    >
      {/* header */}
      <div className="w-full bg-gray-950/80 py-2 px-2 flex justify-between items-center mt-2 rounded-lg">
        {/* textingUser Data */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-gray-700 shadow-2xl shadow-gray-500 flex items-center justify-center overflow-hidden">
            <img
              src={textingUser?.image || dp}
              alt="texting user image"
              className="w-full h-full"
            />
          </div>
          <div>
            <h1>{textingUser?.name}</h1>
            <p className="text-sm text-gray-400">{typing ? "typing..." : ""}</p>
          </div>
        </div>
        {/* Back button */}
        <div>
          <IoChevronBackCircleOutline
            className="size-7"
            onClick={(e) => dispatch(setTextingUser(null))}
          />
        </div>
      </div>
      {/* chat view area */}
      <div className="w-full flex-1 py-2 h-[calc(100vh-210px)] md:h-[calc(100vh-170px)] overflow-y-auto no-scrollbar rounded-md">
        {text
          ? text.map((message, index) =>
              message.from === loginUser._id ? (
                <SendersText
                  message={message.message}
                  image={message.image}
                  key={index}
                />
              ) : (
                <ReceiversText
                  message={message.message}
                  image={message.image}
                  key={index}
                />
              )
            )
          : ""}
      </div>
      {/* footer/ write and send text */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[98%] h-12 bg-gray-950/80 rounded-lg flex items-center">
        {/* emojipicker */}
        <div className="px-2 hover:bg-gray-800 transition-all duration-300 h-full flex items-center">
          {showEmojiPicker && (
            <div className="absolute bottom-[100px] lg:bottom-[70px] left-[20px]">
              <EmojiPicker
                width={250}
                height={350}
                onEmojiClick={handleEmojiPicker}
              />
            </div>
          )}
          <GrEmoji
            className="size-6 "
            onClick={(e) => setShowEmojiPicker(!showEmojiPicker)}
          />
        </div>
        {/* image picker */}
        <div className="px-2 hover:bg-gray-800 transition-all duration-300 h-full flex items-center">
          <img
            src={frontEndImage}
            alt=""
            className="w-[150px] absolute bottom-[70px] right-[30px] rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            ref={image}
            onChange={handleImage}
            hidden
          />
          <TiDocumentText
            className="size-6 "
            onClick={(e) => image.current.click()}
          />
        </div>
        {/* chat input */}
        <input
          type="text"
          className="bg-white h-8 w-full px-4 outline-none text-black"
          onChange={(e) => handleTyping(e)}
          value={inputText ? inputText : ""}
        />
        {/* send chat */}
        <button
          className="px-2 hover:bg-gray-800 transition-all duration-300 h-full flex items-center"
          onClick={handleSendChat}
          disabled={sendingMsg ? true : false}
        >
          <GrSend className="size-5 " />
        </button>
      </div>
    </div>
  );
};

export default HomeUsersChatArea;
