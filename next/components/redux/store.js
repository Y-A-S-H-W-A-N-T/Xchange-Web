import { configureStore } from '@reduxjs/toolkit'
import newsReducer from '../slices/newsSlice'
import communitySlice from '../slices/communitySlice'
import roomSlice from '../slices/roomSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    communities: communitySlice,
    rooms: roomSlice
  },
});
