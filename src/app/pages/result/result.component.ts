import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AnalysisService } from '../../services/analysis.service';
import { IJob } from '../../model/IJob';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GardenerService } from '../../services/gardener.service';
import { IGardener } from '../../model/IGardener';
import { EmailComponent } from '../../components/email/email.component';

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
    gardeners: IGardener[] = [];

    @ViewChild('email') email: EmailComponent;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private aService: AnalysisService,
        private gService: GardenerService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getResult(id);
        });
        this.getGardeners();
    }

    openEmail(){
        this.email.open();
    }

    /**
     * Tries to load result every 1s
     * @param id 
     */
    getResult(id: string) {
        let interval = setInterval(() => {
            this.aService.getResult(id)
                .then(res => {
                    if(res.success){
                        this.job = res.data;
                        clearInterval(interval);
                    }
                })
                .catch(err => console.error(err));
        }, 1000);
    }

    getGardeners() {
        this.gService.getAllGardeners()
            .then(gardeners => this.gardeners = gardeners)
            .catch(err => console.error(err));
    }
}
