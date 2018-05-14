import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BrowseService} from '../services/browse.service';

@Component({
    selector: 'app-plantdetails',
    templateUrl: './plantdetails.component.html',
    styleUrls: ['./plantdetails.component.css']
})
export class PlantdetailsComponent implements OnInit {
    currentplant: any;
    test: string;

    constructor(private route: Router, private  browservice: BrowseService) {
     console.log('plantdetails created');
    }

    ngOnInit() {
        this.currentplant = this.browservice.plantselect;


    }


    Onshowanalyse() {
        this.route.navigate(['/results']);
    }
}
