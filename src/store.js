import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./reduxx/pasteSlice";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
