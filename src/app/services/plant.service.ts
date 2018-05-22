import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { IPlant } from '../model/IPlant';

@Injectable()
export class PlantService extends DataService{

  constructor(protected apiService: ApiService) { 
    super('plants/', apiService, ['created', 'modified']);
  }

  getAllPlants():Promise<IPlant[]>{
    return this.readItems<IPlant>();
  }

  getSinglePlant(id: number|string){
    return this.readSingleItem<IPlant>(id);
  }

}
