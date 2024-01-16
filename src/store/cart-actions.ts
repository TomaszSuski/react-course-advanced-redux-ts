import { CartItem, cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

// access DATABASE_URL from .env file
const URL = process.env.REACT_APP_DATABASE_URL!;

//--------------------------------------------------------------
// using action creator thunk to send http PUT request
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

// using action creator to fetch data from database
export const fetchCartData = () => {
  return async (dispatch: any) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data!",
      })
    );

    const fetchData = async () => {
      const response = await fetch(`${URL}/cart.json`);

      if (!response.ok) {
        throw new Error("Fetching cart data failed.");
      }

      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData || [],
        })
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Fetched cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

//--------------------------------------------------------------
