import { useContext } from 'react';
import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
    const ctx = useContext(CartContext);

    const cartItemRemoveHandler = id =>{
        ctx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        ctx.addItem({ ...item, amount: 1});
    };

    const cartItens = <ul className={styles['cart-items']}>
        {ctx.items.map( i => <CartItem 
                                    key={i.id} 
                                    name={i.name} 
                                    amount={i.amount} 
                                    price={i.price}
                                    onRemove={cartItemRemoveHandler.bind(null, i.id)}
                                    onAdd={cartItemAddHandler.bind(null, i)}
                                    /> )}
    </ul> 
    const totalAmount = `R$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    return(
        <Modal onClose={props.onClose}>
            {cartItens}
            <div className={styles.total}>
                <span>Total</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button-alt']} onClick={props.onClose} >Close</button>
                {hasItems && <button className={styles['button']} >Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;