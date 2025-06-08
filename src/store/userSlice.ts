import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  uid: string | null;
}

const initialState: UserState = {
  email: null,
  uid: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    logoutUser: (state) => {
      state.email = null;
      state.uid = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
