import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:'user',
  initialState:{
    loginUser:null,
    textingUser:null,
    liveUsers:null,
    sockObj:null
  },
  reducers:{
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    setTextingUser: (state, action) => {
      state.textingUser = action.payload;
    },
    setLiveUsers: (state, action) => {
      state.liveUsers = action.payload;
    },
    setSockObj: (state, action) => {
      state.sockObj = action.payload;
    }
  }
})

export const {setLoginUser, setTextingUser, setLiveUsers, setSockObj} = userSlice.actions;
export default userSlice.reducer;