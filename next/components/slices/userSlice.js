// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vtu: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.vtu = action.payload
    },
    signout: (state) => {
      state.vtu = null
    }
  },
});

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;