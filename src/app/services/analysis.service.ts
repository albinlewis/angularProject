import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { IJob } from '../model/IJob';

@Injectable()
export class AnalysisService{

  constructor(private apiService: ApiService) { }

  // Start the analysis
  startAnalysis(data: FormData): Promise<any> {
    return this.apiService.post('analysis', data).toPromise();
  }

  // Get a result
  getResult(id: string): Promise<any>{
    return this.apiService.get('result/' + id).toPromise();
  }

  // Get history of user
  getHistory(){
    return new Promise<IJob[]>((resolve, reject) => {
      this.apiService.get('history')
        .subscribe(
          (res: any) => resolve(res.data),
          (err: any) => reject(err)
        )
    });
  }

}
