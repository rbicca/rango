import { useContext , useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCardButton = props => {

    const [isOn, setIsOn] = useState(false);
    const ctx = useContext(CartContext);

    const nroDeItens = ctx.items.reduce( (acc, item) => acc + item.amount ,  0 );

    const btnClasses = `${styles.button} ${isOn ? styles.bump : ''}`;
    const { itens } = ctx.items;

    useEffect( ()=> {
        if(ctx.items.length === 0){
            return;
        }
        setIsOn(true);

        const timer = setTimeout(() => {
            setIsOn(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    },[ctx] );

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}><CartIcon /></span>
            <span>Carrinho</span>
            <span className={styles.badge}>{nroDeItens}</span>
        </button>
    );

}

export default HeaderCardButton;