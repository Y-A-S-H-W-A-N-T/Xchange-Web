import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { GET_NEWS } from '../grapql/newsQueries'
import client from '../grapql/apolloserver';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await client.query({ query: GET_NEWS });
  return response.data.getNews
})

export const addNews = createAsyncThunk('news/addNews', async(newNews)=>{
  const response = await axios.post('http://localhost:3000/api/news/upload_news',newNews)
  return response.data.data
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
    resetAddStatus(state) {
      state.addstatus = 'idle';
    },
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

export const { resetAddStatus } = newsSlice.actions
export default newsSlice.reducer;
