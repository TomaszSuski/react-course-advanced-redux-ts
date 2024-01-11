import React from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { CartInterface } from "./store/cart";

function App() {
  const cartVisible = useSelector((state: CartInterface) => state.cart.cartVisible);
  return (
    <Layout>
      {cartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
