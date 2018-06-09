import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { IGardener } from '../model/IGardener';

@Injectable()
export class GardenerService extends DataService {

  constructor(protected apiService: ApiService) {
    super('gardeners', apiService);
  }

  getAllGardeners(): Promise<IGardener[]> {
    return this.readItems<IGardener>();
  }

  getSingleGardener(id: number | string) {
    return this.readSingleItem<IGardener>(id);
  }

}
