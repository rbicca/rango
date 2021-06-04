import { useState } from 'react';
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';


function App() {

  const [cartIsShown, setCardIsshown] = useState(false);

  const showCartHandler = () => setCardIsshown(true);

  const hideCartHandler = () => setCardIsshown(false);

  return (
    <CartProvider>
      { cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header  onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
