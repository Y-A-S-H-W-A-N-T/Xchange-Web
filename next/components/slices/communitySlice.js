import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../grapql/apolloserver'
import { GET_COMMUNITIES, ADD_COMMUNITY, ADD_POST } from '../grapql/communityQueries';

export const fetchCommunities = createAsyncThunk('community/fetchCommunities', async () => {
  const response = await client.query({ query: GET_COMMUNITIES, fetchPolicy: 'network-only' })
  return response.data.getCommunities
})

export const addCommunity = createAsyncThunk('community/addCommunity', async(newcommunity)=>{
  const response = await client.mutate(
    {
      mutation: ADD_COMMUNITY,
      variables: {
        input: {
          leader_vtu: newcommunity.vtu,
          name: newcommunity.name,
          description: newcommunity.description,
          members: newcommunity.members || [],
          posts: newcommunity.posts || [],
        },
      },
    }
  )

  const community = response.data.addCommunity;
  return  { 
    id: community.id,
    name: community.name,
    leader_vtu: community.leader_vtu,
    description: community.description,
    members: community.members,
    posts: community.posts
  }
})

export const addPostToCommunity = createAsyncThunk('community/addPostToCommunity', async (Post) => {
  const response = await client.mutate(
    {
      mutation: ADD_POST,
      variables: {
        communityID: Post.community_id,
        post: {
          post_title: Post.post_title,
          post_media: Post.post_media
        },
      },
    }
  )
  console.log(response)
  const community = response.data.addPostToCommunity

  return  {
    id: community.id,
    name: community.name,
    leader_vtu: community.leader_vtu,
    description: community.description,
    members: community.members,
    posts: community.posts
  }
})

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    communities: [],
    status: 'idle',
    error: null,
    addstatus: 'idle',
    addpoststatus: 'idle'
  },
  reducers: {
    resetAddStatus(state) {
      state.addstatus = 'idle';
    },
    resetAddPostStatus(state){
      state.addpoststatus = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCommunity.pending,(state)=>{
        state.addstatus = 'pending'
      })
      .addCase(addCommunity.fulfilled, (state, action) => {
        state.communities.push(action.payload);
        state.addstatus = 'succeeded';
      })
      .addCase(addCommunity.rejected,(state,action)=>{
        state.addstatus = 'failed'
        state.error = action.error.message
      })
      .addCase(addPostToCommunity.pending,(state)=>{
        state.addpoststatus = 'pending'
      })
      .addCase(addPostToCommunity.fulfilled, (state, action) => {
        state.communities.push(action.payload);
        state.addpoststatus = 'succeeded';
      })
      .addCase(addPostToCommunity.rejected,(state,action)=>{
        state.addpoststatus = 'failed'
        state.error = action.error.message
      })
  },
});

export const { resetAddStatus, resetAddPostStatus } = communitySlice.actions
export default communitySlice.reducer;
