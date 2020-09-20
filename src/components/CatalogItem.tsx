import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';

import {
  addProductToCartRequest,
  subtractProductQuantity,
  removeProductFromCart,
} from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>((state) => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  const handleSubtractProductQuantity = useCallback(() => {
    dispatch(subtractProductQuantity(product.id));
  }, [dispatch, product]);

  const handleRemoveProductFromCart = useCallback(() => {
    dispatch(removeProductFromCart(product.id));
  }, [dispatch, product]);

  return (
    <>
      <article>
        <strong>{product.title}</strong>
        {' - '}
        <span>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(product.price)}
        </span>
        {'  '}
        <button type="button" onClick={handleSubtractProductQuantity}>
          Subtract
        </button>
        {'  '}
        <button type="button" onClick={handleAddProductToCart}>
          Add
        </button>
        {'  '}
        <button type="button" onClick={handleRemoveProductFromCart}>
          Delete
        </button>
        {hasFailedStockCheck && (
          <span style={{ color: 'red' }}> Sold out!</span>
        )}
      </article>
      <br />
    </>
  );
};

export default CatalogItem;
