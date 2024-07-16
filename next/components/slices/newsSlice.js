import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { ADD_NEWS, GET_NEWS } from '../grapql/newsQueries'
import client from '../grapql/apolloserver';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await client.query({ query: GET_NEWS, fetchPolicy: 'network-only' })
  return response.data.getNews
})

export const addNews = createAsyncThunk('news/addNews', async(newNews)=>{
  const response = await client.mutate(
    {
      mutation: ADD_NEWS,
      variables: {
        headline: newNews.headline,
        description: newNews.description,
        image: newNews.image
      }
    }
  )
  const returnObject = {
    id: response.data.addNews.id, // new line of code , 17-7-24
    headline: response.data.addNews.headline,
    description: response.data.addNews.description,
    image: response.data.addNews.image
  }
  return  returnObject
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
        console.log(action.error.message)
        state.error = action.error.message
      })
  },
});

export const { resetAddStatus } = newsSlice.actions
export default newsSlice.reducer;
