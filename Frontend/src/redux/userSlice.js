import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:'user',
  initialState:{
    loginUser:null,
    textingUser:null,
    liveUsers:null,
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
    }
  }
})

export const {setLoginUser, setTextingUser, setLiveUsers} = userSlice.actions;
export default userSlice.reducer;