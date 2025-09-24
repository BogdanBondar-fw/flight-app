import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type FilterCriteria = 'price-asc' | 'price-desc' | 'departure' | 'duration';

interface FilterState {
  searchQuery: string;
  filterCriteria: FilterCriteria;
  showOnlyFavorites: boolean;
}

const initialState: FilterState = {
  searchQuery: '',
  filterCriteria: 'price-asc',
  showOnlyFavorites: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterCriteria: (state, action: PayloadAction<FilterCriteria>) => {
      state.filterCriteria = action.payload;
    },
    setShowOnlyFavorites: (state, action: PayloadAction<boolean>) => {
      state.showOnlyFavorites = action.payload;
    },
  },
});

export const { setSearchQuery, setFilterCriteria, setShowOnlyFavorites } = filterSlice.actions;
export default filterSlice.reducer;
