import { createSlice } from '@reduxjs/toolkit';

export const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    filteredData: [],
    orgUnits: [],
    selectedOrgUnit: '',
  },
  reducers: {
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setOrgUnits: (state, action) => {
      state.orgUnits = action.payload;
    },
    setSelectedOrgUnit: (state, action) => {
      state.selectedOrgUnit = action.payload;
    },
  },
});

export const { setFilteredData, setOrgUnits, setSelectedOrgUnit } = recordsSlice.actions;
export default recordsSlice.reducer;
