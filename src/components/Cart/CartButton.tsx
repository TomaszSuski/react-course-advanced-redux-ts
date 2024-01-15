import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice";
import { CartInterface } from "../../store/cart-slice";

const CartButton = () => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector((state: CartInterface) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsCount}</span>
    </button>
  );
};

export default CartButton;
