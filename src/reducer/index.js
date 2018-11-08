/* @flow */

import _ from 'lodash';

import * as T from '../actions/types';

const initialState = {
  accessToken: '',
  brokerageAccountId: '',
  diff: null,
  diffServerTimestamp: 0,
  isAuthorized: false,
  portfolio: [],
  prices: {},
  refreshToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.AUTHORIZATION_TOKEN_SET:
      return {
        ...state,
        isAuthorized: true,
      };

    case T.BROKERAGE_ACCOUNT_SET:
      return {
        ...state,
        brokerageAccountId: action.payload,
      };

    case T.DIFF_RECEIVED:
      return {
        ...state,
        // TODO: Keep only needed data.
        diff: _.assign({}, state.diff, action.payload),
        diffServerTimestamp: action.payload.serverTimestamp,
      };

    case T.LOGGED_OUT:
      return initialState;

    case T.STOCK_ADDED:
      return {
        ...state,
        portfolio: state.portfolio.concat([action.payload]),
      };

    case T.STOCK_PRICE_RECEIVED:
      return {
        ...state,
        prices: {
          ...state.prices,
          [action.payload.symbol]: action.payload.price,
        },
      };

    case T.STOCK_REMOVED:
      return {
        ...state,
        portfolio: state.portfolio.filter(({ symbol }) => (
          symbol !== action.payload
        )),
      };

    case T.TOKENS_RECEIVED:
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      };

    default:
      return state;
  }
};
