import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BrowseService} from "../services/browse.service";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
    currentplant: any;
    diseases = [{name: 'asuaidf', percentage: 15}
        , {name: 'msamsam', percentage: 56}
        , {name: 'qpqpq', percentage: 70}
        , {name: 'laksal', percentage: 60}
    ];

    constructor(private route: Router, private browservice: BrowseService) {
    }

    ngOnInit() {
        this.currentplant = this.browservice.plantselect;
    }

    Onshowdisease() {
           this.route.navigate(['/disease']);
    }

}
