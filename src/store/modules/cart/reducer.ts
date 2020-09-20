import { Reducer } from 'redux';
import produce from 'immer';

import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  total: 0,
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id,
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        draft.total = draft.items.reduce((total, cart) => {
          return total + cart.product.price * cart.quantity;
        }, 0);

        break;
      }

      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }

      case ActionTypes.subtractProductQuantity: {
        const { productId } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === productId,
        );

        if (
          productInCartIndex >= 0 &&
          draft.items[productInCartIndex].quantity > 1
        ) {
          draft.items[productInCartIndex].quantity--;
        }

        draft.total = draft.items.reduce((total, cart) => {
          return total + cart.product.price * cart.quantity;
        }, 0);

        break;
      }

      case ActionTypes.removeProductFromCart: {
        const { productId } = action.payload;

        const productsFiltered = draft.items.filter(
          (item) => item.product.id !== productId,
        );

        draft.items = productsFiltered;

        draft.total = draft.items.reduce((total, cart) => {
          return total - cart.product.price * cart.quantity;
        }, 0);

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default cart;
