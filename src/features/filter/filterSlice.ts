import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FilterType = 'all' | 'completed' | 'active'

interface FilterState {
  search: string
  status: FilterType
}

const initialState: FilterState = {
  search: '',
  status: 'all',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setStatus: (state, action: PayloadAction<FilterType>) => {
      state.status = action.payload
    },
  },
})

export const { setSearch, setStatus } = filterSlice.actions
export default filterSlice.reducer
