import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AnalysisService } from '../services/analysis.service';
import { IJob } from '../model/IJob';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css'],
    providers: [AnalysisService]
})
export class ResultComponent implements OnInit {
    job: IJob;
    sub: Subscription;
    apiHost: string = environment.API_HOST;

    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private aService: AnalysisService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getResult(id);
        });
    }

    getResult(id:string){
        this.aService.getResult(id)
            .then(job => {
                this.job = job;
                console.log(this.job);
            })
            .catch(err => console.error(err));
    }
}
