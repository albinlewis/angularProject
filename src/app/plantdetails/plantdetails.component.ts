import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IPlant } from '../model/IPlant';
import { PlantService } from '../services/plant.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-plantdetails',
    templateUrl: './plantdetails.component.html',
    styleUrls: ['./plantdetails.component.css'],
    providers: [PlantService]
})
export class PlantdetailsComponent implements OnInit, OnDestroy {
    plant: IPlant;
    sub: Subscription;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private plantService: PlantService) {
        console.log('plantdetails created');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getPlant(id);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    getPlant(id){
        this.plantService.getSinglePlant(id)
            .then(plant => this.plant = plant)
            .catch(err => console.log(err));
    }

    onShowAnalyse() {
        this.router.navigate(['/result']);
    }
}
