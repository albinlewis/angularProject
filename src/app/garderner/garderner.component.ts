import { Component, OnInit } from '@angular/core';
import {LocationService} from "../services/location.service";

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
    data: any = [{name: 'L-One', lat: '49.818612', lng: '8.623809'}, {
        name: 'Incloud',
        lat: '49.877670',
        lng: '8.639382'
    }];

  constructor(private locationservice: LocationService) { }

  ngOnInit() {
      this.getUserLocation();
      for (const pos of this.data) {
         console.log(this.locationservice.getDistanceBetweenPoints(pos) + pos.name);
      }
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
