import axios from "axios";
import { serverURL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../redux/userSlice";
import { useEffect } from "react";

export const getLoginUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get(`${serverURL}/api/auth/user`, {
          withCredentials: true,
        });
        dispatch(setLoginUser(user.data));
      } catch (error) {
        dispatch(setLoginUser(null));
      }
    };
    fetchUser();
  }, [dispatch]);
};
