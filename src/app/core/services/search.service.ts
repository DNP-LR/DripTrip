import { Injectable } from '@angular/core';
import { Place } from '../../store/search/search.state';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly places: Place[] = [
    {
      id: 1,
      name: 'Place 1',
      location: 'Location 1',
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Place 2',
      location: 'Location 2',
      description: 'Description 2',
    },
    {
      id: 3,
      name: 'Place 3',
      location: 'Location 3',
      description: 'Description 3',
    },
  ];

  public search(query: string): Observable<Place[]> {
    const filteredPlaces: Place[] = this.places.filter(
      (place) =>
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.location.toLowerCase().includes(query.toLowerCase()) ||
        place.description.toLowerCase().includes(query.toLowerCase()),
    );
    return of(filteredPlaces).pipe(delay(1000));
  }
}
