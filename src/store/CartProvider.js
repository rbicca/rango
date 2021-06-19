import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {

    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        const existingIx = state.items.findIndex(i => i.id === action.item.id);
        const existingItem = state.items[existingIx];
        let novosItens;

        if (existingItem){
            const novoItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            novosItens = [...state.items];
            novosItens[existingIx] = novoItem;
        } else {
            novosItens = state.items.concat(action.item);
        }

        return {
            items: novosItens,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE'){

        const existingIx = state.items.findIndex(i => i.id === action.id);

        const existingItem = state.items[existingIx];
        const novoValor = state.totalAmount - existingItem.price;
        let novosItens;
        if (existingItem.amount === 1){
            novosItens = state.items.filter(i => i.id !== action.id );
        } else {
            const novoItem = {  ...existingItem, amount: existingItem.amount -1 };
            novosItens = [...state.items];
            novosItens[existingIx] = novoItem;
        }

        return{
            items: novosItens,
            totalAmount: novoValor
        };
    }

    return defaultState;
};

const CartProvider = props => {

    const [cartState, dispatchAction] =  useReducer(cartReducer, defaultState);

    const addItemToCartHandler = item => {
        dispatchAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,

        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext} >
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;