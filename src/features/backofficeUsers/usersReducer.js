import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  deleteUsers,
  getUsers,
  searchUsers,
} from '../../Services/apiServices/usersApiService'

const initialState = {
  status: 'idle',
  users: [],
  loader: false,
}

export const getUsersThunk = createAsyncThunk(
  'users/getUsersThunk',
  async () => {
    try {
      const response = await getUsers()
      return response.data
    } catch {
      throw new Error()
    }
  },
)

export const searchUsersThunk = createAsyncThunk(
  'category/searchUsersThunk',
  async (val) => {
    try {
      const response = await searchUsers(val)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
)

export const deleteUserThunk = createAsyncThunk(
  'users/deleteUserThunk',
  async (val) => {
    try {
      const response = await deleteUsers(val)
      return response.data
    } catch {
      throw new Error()
    }
  },
)

export const usersReducer = createSlice({
  name: 'backofficeUsers',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.status = action.payload.message
        state.users = action.payload.data
        state.loader = false
      })
      .addCase(getUsersThunk.rejected, (state) => {
        state.status = 'error'
        state.loader = false
      })
      .addCase(searchUsersThunk.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.status = action.payload.message
        state.users = action.payload.data
        state.loader = false
      })
      .addCase(searchUsersThunk.rejected, (state, action) => {
        state.errorMsg = action.error.message
        state.status = 'error'
        state.loader = false
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loader = false
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.errorMsg = action.error.message
        state.status = 'error'
        state.loader = false
      })
  },
})

export default usersReducer.reducer
