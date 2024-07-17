import { configureStore } from '@reduxjs/toolkit'
import newsReducer from '../slices/newsSlice'
import communitySlice from '../slices/communitySlice'
import roomSlice from '../slices/roomSlice';
import userSlice from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    news: newsReducer,
    communities: communitySlice,
    rooms: roomSlice
  },
});
