import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

import { ProductCardContainer } from "./product-card.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer key={id}>
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
