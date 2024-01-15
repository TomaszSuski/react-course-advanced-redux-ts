import { createSlice, ThunkAction, Action } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import store from "./index";

// access DATABASE_URL from .env file
const URL = process.env.REACT_APP_DATABASE_URL!;

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

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

//--------------------------------------------------------------
// using action creator thunk to send http request
export const sendCartData = (cartItems: CartItem[]) => {
  return async (dispatch: any) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`${URL}/cart.json`, {
        method: "PUT",
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
//--------------------------------------------------------------

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
