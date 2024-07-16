import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import client from '../grapql/apolloserver'
import { ADD_ROOM, GET_ROOMS } from '../grapql/roomQueries';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await client.query({ query: GET_ROOMS, fetchPolicy: 'network-only' })
  return response.data.getRooms
})

export const addRoom = createAsyncThunk('rooms/addRoom', async(newroom)=>{
  const response = await client.mutate(
    {
      mutation: ADD_ROOM,
      variables: {
        input : {
          name: newroom.name,
          private: newroom.private,
          passcode: newroom.passcode,
        }
      },
    }
  )

  const room = response.data.addRoom;
  return  { id: room.id, name: room.name, private: room.private, passcode: room.passcode, chats: room.chats }
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
    resetAddStatus(state) {
      state.addstatus = 'idle';
    },
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
})

export const { resetAddStatus } = roomSlice.actions
export default roomSlice.reducer;
