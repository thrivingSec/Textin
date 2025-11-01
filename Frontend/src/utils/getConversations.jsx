import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../main";
import { setText } from "../redux/messageSlice.js";

export const getConversation = () => {
  const { textingUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMsg = async () => {
      try {
        if (textingUser) {
          const res = await axios.get(
            `${serverURL}/api/message/get/${textingUser._id}`,
            { withCredentials: true }
          );
          dispatch(setText(res.data));
        }
      } catch (error) {
        console.log("Error in getConversation :: ", error);
      }
    };
    fetchMsg();
  }, [textingUser]);
};
