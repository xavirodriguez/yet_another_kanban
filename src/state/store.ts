import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    ui: uiReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch