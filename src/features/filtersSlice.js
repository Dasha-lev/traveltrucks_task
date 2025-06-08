import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: '',
  form: '',
  equipment: {
    AC: false,
    kitchen: false,
    bathroom: false,
    TV: false,
    automatic: false
  }
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload
    },
    setForm(state, action) {
      state.form = action.payload
    },
    toggleEquipment(state, action) {
      const key = action.payload
      state.equipment[key] = !state.equipment[key]
    },
    resetFilters(state) {
      state.location = ''
      state.form = ''
      state.equipment = initialState.equipment
    }
  }
})

export const { setLocation, setForm, toggleEquipment, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
