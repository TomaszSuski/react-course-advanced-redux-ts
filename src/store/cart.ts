import { createSlice } from "@reduxjs/toolkit";
import { ProductItemProps } from "../components/Shop/ProductItem";

export interface CartItemProps extends ProductItemProps {
  id: number;
  quantity: number;
}

export interface CartState {
  items: CartItemProps[];
}

const initialCartState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addOneItem(state, action: { payload: CartItemProps }) {
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
