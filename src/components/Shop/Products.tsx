import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          id={1}
          title="Test"
          price={6}
          description="This is a first product - amazing!"
        />
                <ProductItem
          id={2}
          title="Test 2"
          price={5}
          description="This is a second product"
        />
                        <ProductItem
          id={3}
          title="Test 3"
          price={10}
          description="This is a third product"
        />
      </ul>
    </section>
  );
};

export default Products;
