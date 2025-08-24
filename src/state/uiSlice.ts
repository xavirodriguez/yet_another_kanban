import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  showAddForm: boolean;
}

const initialState: UiState = {
  showAddForm: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddForm: (state) => {
      state.showAddForm = true;
    },
    closeAddForm: (state) => {
      state.showAddForm = false;
    },
  },
});

export const { openAddForm, closeAddForm } = uiSlice.actions;
export default uiSlice.reducer;
