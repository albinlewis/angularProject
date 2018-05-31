import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-garderner',
  templateUrl: './garderner.component.html',
  styleUrls: ['./garderner.component.css']
})
export class GardernerComponent implements OnInit {
    title: string = 'My first AGM project';
    lat: number;
    lng: number;
    zoom: number = 10;

  constructor() { }

  ngOnInit() {
      this.getUserLocation();
  }

  getUserLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;
          });
      }
}

}
