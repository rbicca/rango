import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const ctx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        ctx.addItem({ ...item, amount: 1});
    };

    const cmdClick = () =>{
        setIsCheckout(true);
    };
    
    const enviarPedido = async (dadosUser) =>{
        //console.log('enviando ', dadosUser);
        setIsSending(true);
        const response = await fetch('https://sktodo.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: dadosUser,
                items: ctx.items
            })
        });
        setIsSending(false);
        setEnviado(true);
        ctx.clearCart();
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

    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button-alt']} onClick={props.onClose} >Close</button>
            {hasItems && <button className={styles['button']} onClick={cmdClick}  >Order</button>}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItens}
            <div className={styles.total}>
                <span>Total</span>
                <span>{totalAmount}</span>
            </div>
            { isCheckout && <Checkout  onConfirm={enviarPedido} onCancel={props.onClose}/> }
            { !isCheckout && modalActions }
        </>
    );

    const enviandoModalContent = (
        <p>Enviano...</p> 
    );

    const enviadoModalContent = (
        <>
            <p>Pedido enviado com sucesso</p>
            <div className={styles.actions}>
                <button className={styles['button-alt']} onClick={props.onClose} >Close</button>
            </div>
        </>
    );
    return(
        <Modal onClose={props.onClose}>
            {!isSending && !enviado && cartModalContent}
            {isSending && enviandoModalContent}
            {!isSending && enviado && enviadoModalContent}
        </Modal>
    );
}

export default Cart;