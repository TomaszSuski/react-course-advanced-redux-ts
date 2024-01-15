import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { CartInterface } from "../../store/cart-slice";

const Cart = () => {
  const cartItems = useSelector((state: CartInterface) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} id={item.id} />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
