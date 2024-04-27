import {configureStore, createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {isloggedin: false},
  reducers: {
    login(state) {
      state.isloggedin = true;
    },
    logout(state) {
      state.isloggedin = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
