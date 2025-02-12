import { createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { initialSearchState } from './search.state';

export const searchReducer = createReducer(
  initialSearchState,
  on(SearchActions.searchRequest, (state, { query }) => ({
    ...state,
    query,
    loading: true,
    error: null,
  })),
  on(SearchActions.searchSuccess, (state, { results }) => ({
    ...state,
    results,
    loading: false,
    error: null,
  })),
  on(SearchActions.searchFailure, (state, { error }) => ({
    ...state,
    results: [],
    loading: false,
    error,
  })),
  on(SearchActions.clearSearch, () => initialSearchState),
);
