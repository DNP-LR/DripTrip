import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { searchReducer } from './search/search.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  search: searchReducer,
};
