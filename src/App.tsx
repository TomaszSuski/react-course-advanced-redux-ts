import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { CartInterface } from "./store/cart-slice";
import { UIInterface, uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

// access DATABASE_URL from .env file
const URL = process.env.REACT_APP_DATABASE_URL!;

let isInitial = true;

function App() {
  const cartVisible = useSelector((state: UIInterface) => state.ui.cartVisible);
  const cartItems = useSelector((state: CartInterface) => state.cart.items);
  const notification = useSelector(
    (state: UIInterface) => state.ui.notification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      const response = await fetch(`${URL}/cart.json`, {
        method: "PUT",
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cartItems, dispatch]);

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
