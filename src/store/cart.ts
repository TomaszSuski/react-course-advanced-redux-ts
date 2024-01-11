import { createSlice } from "@reduxjs/toolkit";
import { ProductItemProps } from "../components/Shop/ProductItem";

export interface CartItemProps extends ProductItemProps {
  quantity: number;
}

export interface CartState {
  items: CartItemProps[];
  cartVisible: boolean;
}

export interface CartInterface {
  cart: CartState;
}

const initialCartState: CartState = { items: [], cartVisible: false };

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
    toggleCart(state) {
      state.cartVisible = !state.cartVisible;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
