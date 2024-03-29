import { createSlice, ThunkAction, Action } from "@reduxjs/toolkit";
import store from "./index";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  changed: boolean;
}

export interface CartInterface {
  cart: CartState;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const initialCartState: CartState = { items: [], changed: false };

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
        state.changed = true;
      } else {
        state.items[
          state.items.findIndex((item) => item.id === action.payload.id)
        ].quantity += 1;
        state.changed = true;
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
        state.changed = true;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.changed = true;
      }
    },
    replaceCart(state, action: { payload: { items: CartItem[] } }) {
      state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
