import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CardItem from './CartItem';
import CartContext from '../../store/cart-context';
const Cart = props => {
    const cartCtx = useContext(CartContext);

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };



    const cartItems =<ul className={classes['cart-items']}>{cartCtx.items.map(item => <CardItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={cartItemAddHandler.bind(null,item)} onRemove={cartItemRemoveHandler.bind(null,item.id)}/>)}</ul> ;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                {hasItems && <button className={classes['button']}>Order</button>}
            </div>
        </Modal>
    );
}
export default Cart;