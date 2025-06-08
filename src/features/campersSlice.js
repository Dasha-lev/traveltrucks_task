import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loadCampers = createAsyncThunk(
  'campers/loadCampers',
  async (params, thunkAPI) => {
    try {
      const { page, limit = 4, filters = {} } = params
      const response = await axios.get(
        'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
        {
          params: {
            page,
            limit,
            ...filters,
          },
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    page: 1,
    filters: {},
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    resetCampers(state) {
      state.list = []
      state.page = 1
    },
    setFilters(state, action) {
      state.filters = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCampers.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadCampers.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const campers = Array.isArray(action.payload.items)
          ? action.payload.items
          : []

        if (state.page === 1) {
          state.list = campers
        } else {
          state.list = [...state.list, ...campers]
        }
      })
      .addCase(loadCampers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})

export const { setPage, resetCampers, setFilters } = campersSlice.actions
export default campersSlice.reducer
