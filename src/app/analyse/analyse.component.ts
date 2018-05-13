import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-analyse',
    templateUrl: './analyse.component.html',
    styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {

    name = 'Angular 4';
    url = '';
    showImage: boolean = false;

    constructor() {

    }

    ngOnInit() {

    }

    onSelectFile(event) {
        this.showImage = true;
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => { // called once readAsDataURL is completed
              //  this.url = event.target.result;
            };
        }
    }

}
