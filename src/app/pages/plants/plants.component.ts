import {Component, OnInit} from '@angular/core';
import { IPlant } from '../../model/IPlant';
import { PlantService } from '../../services/plant.service';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

    filterValue = '';
    plants: IPlant[] = [];
    errorMessage: string;
    constructor(private plantService: PlantService) {}

    ngOnInit() {
        this.getPlants();
    }

    getPlants(){
        this.errorMessage = null;
        this.plantService.getAllPlants()
            .then(plants => this.plants = plants)
            .catch(err => {
                console.error(err);
                this.errorMessage = "ERRORS.PLANTS";
              });
    }
}
