import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // Ensure video loads properly
    this.preloadVideo();
  }

  preloadVideo() {
    // Preload the video to ensure smooth playback
    // const videoElement = document.createElement('link');
    // videoElement.rel = 'preload';
    // videoElement.href = 'src/video/heroes.mp4';
    // videoElement.as = 'video';
    // document.head.appendChild(videoElement);
  }
}
