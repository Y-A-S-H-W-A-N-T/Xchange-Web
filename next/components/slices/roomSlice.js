import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await fetch('http://localhost:3000/api/room')
  const data = await response.json();
  return data;
})

export const addRoom = createAsyncThunk('rooms/addRoom', async(newroom)=>{
  const response = await axios.post('http://localhost:3000/api/room',newroom)
  return response.data.data
})

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    status: 'idle',
    error: null,
    addstatus: 'idle'
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addRoom.pending,(state)=>{
        state.addstatus = 'pending'
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
        state.addstatus = 'succeeded';
      })
      .addCase(addRoom.rejected,(state,action)=>{
        state.addstatus = 'failed'
        state.error = action.error.message
      })
  },
});

export default roomSlice.reducer;
