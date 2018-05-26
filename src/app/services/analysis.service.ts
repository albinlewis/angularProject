import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { IJob } from '../model/IJob';

@Injectable()
export class AnalysisService{

  constructor(private apiService: ApiService) { }

  startAnalysis(data: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.post('analysis', data)
        .subscribe(
          (res: any) => resolve(res),
          (err: any) => reject(err)
        )
    });
  }

  getResult(id: string): Promise<IJob>{
    return new Promise<IJob>((resolve, reject) => {
      this.apiService.get('result/' + id)
        .subscribe(
          (res: any) => resolve(res.data),
          (err: any) => reject(err)
        )
    });
  }

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
