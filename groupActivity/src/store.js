import { configureStore } from '@reduxjs/toolkit';
import recordsReducer from './slices/recordsSlice';
import groupActivitiesReducer from './slices/groupActivitiesSlice';
import sessionsReducer from './slices/sessionsSlice';

const store = configureStore({
  reducer: {
    records: recordsReducer,
    groupActivities: groupActivitiesReducer,
    sessions: sessionsReducer,
  },
});

export default store;
