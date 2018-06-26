import { Injectable } from '@angular/core';
import { IDisease } from '../model/IDisease';
import { ApiService } from './api.service';
import { DataService } from './data.service';

/**
 * Get diseases
 */
@Injectable()
export class DiseaseService extends DataService{
  private diseases: IDisease[] = [];

  constructor(protected apiService: ApiService) { 
    super('diseases/', apiService, ['created', 'modified']);
  }

  getAllDiseases():Promise<IDisease[]>{
    return this.readItems<IDisease>().then(diseases => this.diseases = diseases);
  }

  async getSingleDisease (id: number|string){
    try{
      let disease = await this.getSingleDisease(id);
      return disease;
    }catch(err){
      try{
        if(!this.diseases.length) await this.getAllDiseases();
        let disease = this.diseases.find(disease => disease._id == id);
        if(!disease) throw err;
        else return disease;
      }catch(err){
        throw err;
      }
    }
  }

}
