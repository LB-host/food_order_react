import { useContext } from "react";
import Modal from "./UI/Modal";

import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handeCloseCart() {
    userProgressCtx.hideCart(); 
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }
  

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={
      userProgressCtx.progress === "cart" ? handeCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            price={item.price}
            quantity={item.quantity}
            name={item.name}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handeCloseCart}>
          Close
        </Button>
       {cartCtx.items.length >0 && (
        <Button onClick={handleGoToCheckout} > Go to checkout</Button>
       )} 
      </p>
    </Modal>
  );
}
