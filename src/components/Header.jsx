import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/userProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    const totalCartItems = cartCtx.items.reduce((totalNumberOtItems, item) => {
        return totalNumberOtItems+ item.quantity;
    }, 0);

    function handleSHowCart() {
        userProgressCtx.showCart();
    }


  return (
    <header id="main-header">
      <div id="title">
        <img  src={logoImg} alt='resto app'/>
        <h1>ReactFood</h1>
      </div>
      <nav>
       <Button textOnly onClick={handleSHowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
