import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  isFullScreen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullScreen = true
      let x = document.getElementById('header-container')
      if (x)
        x.style.display = 'none'
    }
    else {
      document.exitFullscreen()
      this.isFullScreen = false
      let x = document.getElementById('header-container')
      if (x)
        x.style.display = 'inline-flex';
    }
  }

}
