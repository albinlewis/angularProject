import { Injectable } from '@angular/core';
import { IDisease } from '../model/IDisease';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Injectable()
export class DiseaseService extends DataService{

  constructor(protected apiService: ApiService) { 
    super('diseases/', apiService, ['created', 'modified']);
  }

  getAllDiseases():Promise<IDisease[]>{
    return this.readItems<IDisease>();
  }

  getSingleDisease (id: number|string){
    return this.readSingleItem<IDisease>(id);
  }

}
