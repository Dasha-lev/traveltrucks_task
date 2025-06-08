import { createSlice } from '@reduxjs/toolkit'

const stored = JSON.parse(localStorage.getItem('favorites')) || []

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: stored,
  reducers: {
    addFavorite(state, action) {
      if (!state.includes(action.payload)) {
        state.push(action.payload)
        localStorage.setItem('favorites', JSON.stringify(state))
      }
    },
    removeFavorite(state, action) {
      const i = state.indexOf(action.payload)
      if (i !== -1) {
        state.splice(i, 1)
        localStorage.setItem('favorites', JSON.stringify(state))
      }
    }
  }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
