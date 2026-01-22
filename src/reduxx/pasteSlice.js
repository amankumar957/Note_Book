import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  // Sb data paste ka localStorage me rahega
  pastes: localStorage.getItem("pastes") // Agar aisa kuch exist krta h too
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      //add a check-> Paste already exist case

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Notes Create Successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste;
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        // show toast
        toast.success("Notes updated");
      }
    },
    reseAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      // console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id == pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Notes deleted");
      }
    },
  },
});

export const { addToPastes, updateToPastes, reseAllPastes, removeFromPastes } =
  pasteSlice.actions;
export default pasteSlice.reducer;
