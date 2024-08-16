import { createSlice } from '@reduxjs/toolkit';

export const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: {
    data: [],
  },
  reducers: {
    setSessions: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSessions } = sessionsSlice.actions;
export default sessionsSlice.reducer;
