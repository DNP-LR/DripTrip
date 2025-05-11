import { Injectable } from '@angular/core';

export interface NavigationItem {
  label: string;
  path: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _navigationItems: NavigationItem[] = [
    { label: 'Home', path: '/' },
    {
      label: 'Discover',
      path: '/discover',
      children: [
        { label: 'Attractions', path: '/discover/attractions' },
        { label: 'Cities', path: '/discover/cities' },
        { label: 'Regions', path: '/discover/regions' }
      ]
    },
    {
      label: 'Plan Trip',
      path: '/plan-trip',
      children: [
        { label: 'Itineraries', path: '/plan-trip/itineraries' },
        { label: 'Budgeting Tools', path: '/plan-trip/budgeting' }
      ]
    },
    {
      label: 'Badges',
      path: '/badges',
      children: [
        { label: 'My Badges', path: '/badges/my-badges' },
        { label: 'How It Works', path: '/badges/how-it-works' }
      ]
    },
    {
      label: 'Partners',
      path: '/partners',
      children: [
        { label: 'Hotels', path: '/partners/hotels' },
        { label: 'Agencies', path: '/partners/agencies' }
      ]
    },
    { label: 'About Us', path: '/about' }
  ];

  getNavigationItems(): NavigationItem[] {
    return [...this._navigationItems];
  }

  addNavigationItem(item: NavigationItem): void {
    this._navigationItems.push(item);
  }

  removeNavigationItem(label: string): void {
    this._navigationItems = this._navigationItems.filter(item => item.label !== label);
  }
}
