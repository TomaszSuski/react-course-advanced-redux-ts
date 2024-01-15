import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { CartInterface, cartActions } from "../../store/cart-slice";

export interface CartItemProps {
  id: number;
}

const CartItem = ({ id }: CartItemProps) => {
  const item = useSelector((state: CartInterface) =>
    state.cart.items.find((item) => item.id === id)
  )!;
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(cartActions.addOneItem(item));
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeOneItem({ id }));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{item.title}</h3>
        <div className={classes.price}>
          ${(item.price * item.quantity).toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${item.price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
