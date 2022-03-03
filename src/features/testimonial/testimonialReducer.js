import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTestimony } from '../../Services/apiServices/testimonyApiService'

const initialState = {
  testimonials: [],
  status: 'idle',
  loader: false,
  errMsg: '',
}

export const getTestimonial = createAsyncThunk(
  'testimonial/getTestimonial',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestimony()
      if (response.data.success) {
        return response.data.data.reverse()
      } else {
        return rejectWithValue({ error: 'not success' }) // if error is no token the user input data is wrong
      }
    } catch (err) {
      return rejectWithValue({ error: err.response.data.message })
    }
  },
)

export const testimonialReducer = createSlice({
  name: 'testimonial',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonial.pending, (state) => {
        state.status = 'pending'
        state.loader = true
      })
      .addCase(getTestimonial.fulfilled, (state, action) => {
        state.status = action.payload?.message
        state.testimonials = action.payload
        state.loader = false
      })
      .addCase(getTestimonial.rejected, (state, action) => {
        state.status = 'error'
        state.errMsg = action.error.message
        state.loader = false
      })
  },
})

export default testimonialReducer.reducer
