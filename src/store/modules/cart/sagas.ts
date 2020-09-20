import { all, select, takeLatest, put } from 'redux-saga/effects';
import { IState } from '../..';

import { stock } from '../../../services/server.json';

import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from './actions';
import { ActionTypes } from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface stockResponse {
  id: number;
  quantity: number;
}

function* checkProductCheck({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStockResponse =
    stock.find((item) => item.id === product.id)?.quantity ?? 0;

  if (availableStockResponse > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductCheck),
]);
