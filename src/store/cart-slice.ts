import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartInterface {
  cart: CartState;
}

const initialCartState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addOneItem(state, action: { payload: CartItem }) {
      if (
        state.items.length === 0 ||
        state.items.findIndex((item) => item.id === action.payload.id) === -1
      ) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items[
          state.items.findIndex((item) => item.id === action.payload.id)
        ].quantity += 1;
      }
    },
    removeOneItem(state, action: { payload: { id: number } }) {
      if (
        state.items[
          state.items.findIndex((item) => item.id === action.payload.id)
        ].quantity > 1
      ) {
        state.items[
          state.items.findIndex((item) => item.id === action.payload.id)
        ].quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
