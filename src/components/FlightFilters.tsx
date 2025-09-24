import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setFilterCriteria, type FilterCriteria } from '../store/filterSlice';
import { setShowOnlyFavorites } from '../store/filterSlice';
import type { RootState } from '../store/store';

const FlightFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery, filterCriteria, showOnlyFavorites } = useSelector((state: RootState) => state.filter);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    dispatch(setFilterCriteria(event.target.value as FilterCriteria));
  };

  const handleFavoritesToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowOnlyFavorites(event.target.checked));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField
        label="Search flights"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ minWidth: 200 }}
        placeholder="Search by destination, origin or airline..."
      />
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={filterCriteria}
          label="Sort by"
          onChange={handleFilterChange}
        >
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="departure">Departure Time</MenuItem>
          <MenuItem value="duration">Flight Duration</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={showOnlyFavorites}
            onChange={handleFavoritesToggle}
            color="primary"
          />
        }
        label="Show favorites only"
      />
    </Box>
  );
};

export default FlightFilters;