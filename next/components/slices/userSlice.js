import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
  },
  reducers: {
    registerUser(state,action){
        state.user = action.payload
    }
  },
})

export const { registerUser } = userSlice.actions
export default userSlice.reducer;
