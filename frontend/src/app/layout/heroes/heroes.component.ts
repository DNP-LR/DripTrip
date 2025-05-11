import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './heroes.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('1000ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class HeroesComponent implements OnInit, OnDestroy {

  public backgroundVideos = [
    {src: '/video/heroes.mp4', type: 'video/mp4', alt: 'Cameroon Landscape'},
    // {src: '/video/heroes.mp4', type: 'video/mp4', alt: 'Cameroon Culture'},
    // {src: '/video/heroes.mp4', type: 'video/mp4', alt: 'Cameroon Wildlife'}
  ];

  public currentVideoIndex = 0;


  private autoScrollInterval: any;

  public categoryOptions = [
    {value: '', label: 'All Categories'},
    {value: 'adventure', label: 'Adventure'},
    {value: 'culture', label: 'Culture'},
    {value: 'nature', label: 'Nature'},
    {value: 'food', label: 'Food & Cuisine'}
  ];

  public regionOptions = [
    {value: '', label: 'All Regions'},
    {value: 'north', label: 'North'},
    {value: 'south', label: 'South'},
    {value: 'east', label: 'East'},
    {value: 'west', label: 'West'},
    {value: 'central', label: 'Central'}
  ];

  public selectedCategory: string = '';
  public selectedRegion: string = '';
  public searchLocation: string = '';

  constructor() {
  }

  ngOnInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  public startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.nextVideo();
    }, 10000);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  nextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.backgroundVideos.length;
  }

  prevVideo() {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.backgroundVideos.length) % this.backgroundVideos.length;
  }

  goToVideo(index: number) {
    if (index >= 0 && index < this.backgroundVideos.length) {
      this.currentVideoIndex = index;
    }
  }

  public search(): void {
    console.log('Searching with:', {
      location: this.searchLocation,
      category: this.selectedCategory,
      region: this.selectedRegion
    });
  }
}
