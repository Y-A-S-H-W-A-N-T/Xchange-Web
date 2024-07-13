import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await fetch('http://localhost:8000/news')
  const data = await response.json();
  return data;
})

export const addNews = createAsyncThunk('news/addNews', async(newNews)=>{
  const response = await axios.post('http://localhost:8000/addnews',newNews)
  return response
})

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    status: 'idle',
    error: null,
    addstatus: 'idle'
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNews.pending,(state)=>{
        state.addstatus = 'pending'
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.news.push(action.payload);
        state.addstatus = 'succeeded';
      })
      .addCase(addNews.rejected,(state,action)=>{
        state.addstatus = 'failed'
        state.error = action.error.message
      })
  },
});

export default newsSlice.reducer;
