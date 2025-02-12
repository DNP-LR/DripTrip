import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { Store } from '@ngrx/store';
import { Place, SearchState } from '../../../store/search/search.state';
import { Observable } from 'rxjs';
import {
  selectSearchError,
  selectSearchLoading,
  selectSearchResults,
} from '../../../store/search/search.selectors';
import { searchRequest } from '../../../store/search/search.actions';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, InputFieldComponent, AsyncPipe, NgIf, NgForOf],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() public placeholder = 'Search...';
  @Output() public searchStarted = new EventEmitter<string>();

  public searchForm = new FormGroup({
    searchQuery: new FormControl(''),
  });
  private store = inject(Store<SearchState>);
  public searchResults$: Observable<Place[]> =
    this.store.select(selectSearchResults);
  public loading$: Observable<boolean> = this.store.select(selectSearchLoading);
  public error$: Observable<string | null> =
    this.store.select(selectSearchError);
  public searchQuery = '';

  public onSearch(query: string): void {
    this.searchStarted.emit(query);
    this.store.dispatch(searchRequest({ query }));
  }

  public onClearSearch(): void {
    this.searchQuery = '';
    this.store.dispatch(searchRequest({ query: '' }));
  }
}
