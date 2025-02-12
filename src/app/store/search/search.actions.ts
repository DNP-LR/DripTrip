import { createAction, props } from '@ngrx/store';
import { Place } from './search.state';

export const searchRequest = createAction(
  '[Search] Search Request',
  props<{ query: string }>(),
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ results: Place[] }>(),
);

export const searchFailure = createAction(
  '[Search] Search Failure',
  props<{ error: string }>(),
);

export const clearSearch = createAction('[Search] Clear Search');
