import { Component, OnInit } from '@angular/core';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-listmap',
  templateUrl: './listmap.component.html',
  styleUrls: ['./listmap.component.css']
})
export class ListmapComponent implements OnInit {

  constructor(private mapservice: MapService) { }

  ngOnInit() {

      console.log(this.mapservice.data);
  }

}
