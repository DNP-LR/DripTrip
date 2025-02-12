import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Place } from './search.state';
import * as SearchActions from './search.actions';
import { SearchService } from '../../core/services/search.service';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);
  private searchService = inject(SearchService);

  public search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchRequest),
      switchMap((action) =>
        this.searchService.search(action.query).pipe(
          map((results: Place[]) => SearchActions.searchSuccess({ results })),
          catchError((error) =>
            of(SearchActions.searchFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
