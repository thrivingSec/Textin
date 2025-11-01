import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name:"messages",
  initialState:{
    text:null
  },
  reducers:{
    setText: (state, action) => {
      state.text = action.payload
    }
  }
});

export const {setText} = messageSlice.actions;
export default messageSlice.reducer;