import { useContext } from 'react';
import CartContext from '../../store/cart-context';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCardButton = props => {
    const ctx = useContext(CartContext);

    const nroDeItens = ctx.items.reduce( (acc, item) => acc + item.amount ,  0 );

    return(
        <button className={styles.button} onClick={props.onClick}>
            <span className={styles.icon}><CartIcon /></span>
            <span>Carrinho</span>
            <span className={styles.badge}>{nroDeItens}</span>
        </button>
    );

}

export default HeaderCardButton;