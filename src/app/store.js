import { configureStore } from '@reduxjs/toolkit'
import campersReducer from '../features/campersSlice'

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
})
