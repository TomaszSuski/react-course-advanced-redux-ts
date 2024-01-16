import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, CartInterface } from "./store/cart-slice";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import { UIInterface } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const cartVisible = useSelector((state: UIInterface) => state.ui.cartVisible);
  const cartItems = useSelector((state: CartInterface) => state.cart.items);
  const cartChanged = useSelector((state: CartInterface) => state.cart.changed);
  const notification = useSelector(
    (state: UIInterface) => state.ui.notification
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cartChanged) {
      dispatch(sendCartData(cartItems));
    }
  }, [cartItems, cartChanged, dispatch]);

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
