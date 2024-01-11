import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart";

export interface ProductItemProps {
  id: number;
  title: string;
  price: number;
  description: string;
}

const ProductItem = (props: ProductItemProps) => {
  const { id, title, price, description } = props;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addOneItem({
        id,
        title,
        price,
        quantity: 1,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler} >Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
