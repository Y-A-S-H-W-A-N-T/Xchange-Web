import { configureStore } from '@reduxjs/toolkit'
import newsReducer from '../slices/newsSlice'
import communityReducer from '../slices/communityReducer'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    communities: communityReducer
  },
});
