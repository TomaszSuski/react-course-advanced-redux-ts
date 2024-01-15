import { createSlice } from "@reduxjs/toolkit";

export type NotificationStatus = "pending" | "success" | "error";
export interface UIState {
  cartVisible: boolean;
  notification: {
    status: NotificationStatus;
    title: string;
    message: string;
  } | null;
}

export interface UIInterface {
  ui: UIState;
}

const initialUIState: UIState = { cartVisible: false, notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    toggleCart(state) {
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
