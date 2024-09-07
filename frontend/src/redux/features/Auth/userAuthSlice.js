import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
