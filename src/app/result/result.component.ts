import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
    diseases = [{name: 'asuaidf', percentage: 15}
        , {name: 'msamsam', percentage: 56}
        , {name: 'qpqpq', percentage: 70}
        , {name: 'laksal', percentage: 60}
    ];

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    Onshowdisease() {
           this.route.navigate(['/disease']);
    }

}
