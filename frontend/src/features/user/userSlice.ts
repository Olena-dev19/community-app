import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: JSON.parse(localStorage.getItem("user") || "null")?.name || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.name = action.payload;
      localStorage.setItem("user", JSON.stringify({ name: state.name }));
    },
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
