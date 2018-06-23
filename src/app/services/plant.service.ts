import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { IPlant } from '../model/IPlant';

@Injectable()
export class PlantService extends DataService{

  private plants: IPlant[] = [];

  constructor(protected apiService: ApiService) { 
    super('plants/', apiService, ['created', 'modified']);
  }

  getAllPlants():Promise<IPlant[]>{
    return this.readItems<IPlant>().then(plants => this.plants = plants);
  }

  async getSinglePlant(id: number|string){
    try{
      let plant = await this.readSingleItem<IPlant>(id);
      return plant;
    }catch(err){
      let plant = this.plants.find(plant => plant._id === id);
      if(!plant) throw err;
      else return plant;
    }
  }

}
