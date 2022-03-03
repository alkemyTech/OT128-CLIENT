import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getMembers,
  postMembers,
  putMembers,
  searchMembers,
} from '../../Services/apiServices/membersApiService'

const initialState = {
  members: [],
  status: 'idle',
  loader: false,
  errMsg: '',
}

export const fetchMember = createAsyncThunk(
  'members/getMembers',
  async (id) => {
    try {
      const response = await getMembers(id)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
)

export const search = createAsyncThunk(
  'members/searchMembers',
  async (query) => {
    try {
      const response = await searchMembers(query)
      return response.data.data
    } catch (error) {
      throw new Error(error)
    }
  },
)

export const postMemberRedux = createAsyncThunk(
  'members/postMemberRedux',
  async (body) => {
    try {
      console.log(body)
      const response = await postMembers(body)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
)

export const putMemberRedux = createAsyncThunk(
  'members/putMemberRedux',
  async ({ id, body }) => {
    try {
      console.log(id, body)
      const response = await putMembers(id, body)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
)

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch members reducers
      .addCase(fetchMember.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(fetchMember.fulfilled, (state, action) => {
        state.status = action.payload.message
        state.members = action.payload.data
        state.loader = false
      })
      .addCase(fetchMember.rejected, (state, action) => {
        state.status = 'error'
        state.errMsg = action.error.message
        state.loader = false
      })

      // search members reducers
      .addCase(search.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(search.fulfilled, (state, action) => {
        state.status = action.payload.message
        state.members = action.payload
        state.loader = false
      })
      .addCase(search.rejected, (state, action) => {
        state.status = 'error'
        state.errMsg = action.error.message
        state.loader = false
      })

      // post members reducers
      .addCase(postMemberRedux.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(postMemberRedux.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loader = false
      })
      .addCase(postMemberRedux.rejected, (state, action) => {
        state.status = 'error'
        state.errMsg = action.error.message
        state.loader = false
      })

      // put members reducers
      .addCase(putMemberRedux.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(putMemberRedux.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loader = false
      })
      .addCase(putMemberRedux.rejected, (state, action) => {
        state.status = 'error'
        state.errMsg = action.error.message
        state.loader = false
      })
  },
})

export default membersSlice.reducer
export const { resetStatus } = membersSlice.actions
