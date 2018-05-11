import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-plantdetails',
    templateUrl: './plantdetails.component.html',
    styleUrls: ['./plantdetails.component.css']
})
export class PlantdetailsComponent implements OnInit {

    constructor(private route: Router) {
    }

    ngOnInit() {
    }


    Onshowanalyse() {
       this.route.navigate(['/results']);
    }
}
