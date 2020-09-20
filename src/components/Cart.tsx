import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../store';
import { ICartItem } from '../store/modules/cart/types';

const Cart: React.FC = () => {
  const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items);
  const total = useSelector<IState, number>((state) => state.cart.total);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item) => (
            <tr key={item.product.id}>
              <td>{item.product.title}</td>
              <td>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.product.price)}
              </td>
              <td>{item.quantity}</td>

              <td>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.product.price * item.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <strong>Total: </strong>
      <strong>
        {Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(total)}
      </strong>
    </>
  );
};

export default Cart;
