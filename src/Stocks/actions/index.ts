import { createFetchResource, createResetResources } from 'redux-repository/lib/actions';
import { Action } from 'redux-repository/lib/types';
import { ThunkAction } from 'redux-thunk';

import * as C from 'Constants';
import State from 'State';

import iex from '../lib/IEX';
import Quote from '../lib/IEX/Quote';

export interface FetchLogo {
  (symbol: string): void;
}

export const fetchLogo = (
  symbol: string,
): ThunkAction<void, State, null, Action<string, string>> => createFetchResource(
  C.STOCKS_LOGOS_RESOURCE_NAME,
  symbol,
  ({ stocks: { logos } }) => logos,
  (dispatchReceived, dispatchFailed) => {
    iex.getStockLogo(symbol)
      .then(data => dispatchReceived(data))
      .catch(error => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.STOCKS_LOGOS_TTL },
);

export interface ResetLogos {
  (): void;
}

export const resetLogos = (): ThunkAction<void, State, null, Action<string, string>> => (
  createResetResources(C.STOCKS_LOGOS_RESOURCE_NAME)
);

export interface FetchQuote {
  (symbol: string): void;
}

export const fetchQuote = (
  symbol: string,
): ThunkAction<void, State, null, Action<Quote, string>> => createFetchResource(
  C.STOCKS_QUOTES_RESOURCE_NAME,
  symbol,
  ({ stocks: { quotes } }) => quotes,
  (dispatchReceived, dispatchFailed) => {
    iex.getStockQuote(symbol)
      .then(data => dispatchReceived(data))
      .catch(error => dispatchFailed(error.toString()));
  },
  { silentAlready: true, ttl: C.STOCKS_QUOTES_TTL },
);

export interface ResetQuotes {
  (): void;
}

export const resetQuotes = (): ThunkAction<void, State, null, Action<Quote, string>> => (
  createResetResources(C.STOCKS_QUOTES_RESOURCE_NAME)
);
