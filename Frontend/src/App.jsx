import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { getLoginUser } from "./utils/getLoginUser";
import { useDispatch, useSelector } from "react-redux";
import SignupPage from "./pages/SignupPage";
import OneTimePassPage from "./pages/OneTimePassPage";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { setLiveUsers } from "./redux/userSlice";
import { getSocket, initSocket } from "./socketIO/socket.js";

const App = () => {
  getLoginUser();
  const dispatch = useDispatch();
  const { loginUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (loginUser) {
      let socket = initSocket(loginUser._id);
      socket.on("getLiveUsers", (data) => {
        dispatch(setLiveUsers(data));
      });
    } else {
      if (!loginUser) {
        let socket = getSocket();
        if (socket) {
          socket.close();
        }
      }
    }
    return () => {
      let socket = getSocket();
      if (socket) {
        socket.close();
      }
    };
  }, [loginUser?._id]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={!loginUser ? <WelcomePage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/signup"
          element={!loginUser ? <SignupPage /> : <Navigate to={"/profile"} />}
        />
        <Route
          path="/login"
          element={!loginUser ? <LoginPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/home"
          element={loginUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/otp"
          element={
            !loginUser ? <OneTimePassPage /> : <Navigate to={"/profile"} />
          }
        />
        <Route
          path="/profile"
          element={loginUser ? <ProfilePage /> : <Navigate to={"/signup"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
