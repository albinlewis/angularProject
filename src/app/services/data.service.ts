import { ApiService } from "./api.service";

export abstract class DataService {

    static changeStringToDate(item: any, prop: string) {
        if (item[prop] !== null) {
            item[prop] = (typeof item[prop] === 'string' ? new Date(item[prop]) : null);
        }
    }

    constructor(protected serviceUrl: string,
        protected apiService: ApiService,
        protected dateProps ? : string[]) {}

    readItems < T > (): Promise < T[] > {
        return new Promise((resolve, reject) => {
            this.apiService.get(this.serviceUrl)
                .subscribe(
                    (response: any) => {
                        if (!response.success) reject(response.error);
                        else {
                            if (this.dateProps) {
                                response.data.forEach(element => {

                                    this.dateProps.forEach(prop => {
                                        DataService.changeStringToDate(element, prop);
                                    });
                                });
                            }
                            resolve(response.data);
                        }
                    },
                    (err: any) => reject(err)
                );
        });
    }

    readSingleItem<T>(id:number|string): Promise<T>{
      return new Promise((resolve, reject) => {
        this.apiService.get(this.serviceUrl + id)
        .subscribe(
          (response: any) => {
            if (!response.success) reject(response.error);
            else {
                if (this.dateProps) {
                    this.dateProps.forEach(prop => {
                        DataService.changeStringToDate(response.data, prop);
                    });
                }
                resolve(response.data);
            }
        },
        (err: any) => reject(err)
        )
      });
    }


    updateItem<T>(id:number|string, update: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.apiService.patch(this.serviceUrl + id, update)
            .subscribe(
              (response: any) => {
                if (!response.success) reject(response.error);
                else {
                    if (this.dateProps) {
                        this.dateProps.forEach(prop => {
                            DataService.changeStringToDate(response.data, prop);
                        });
                    }
                    resolve(response.data);
                }
            },
            (err: any) => reject(err)
            )
          });
    }

    removeItem<T>(id: number | string):Promise<void>{
        return new Promise((resolve, reject) => {
            this.apiService.delete(this.serviceUrl + id)
            .subscribe(
              (response: any) => {
                if (!response.success) reject(response.error);
                else resolve();
            },
            (err: any) => reject(err)
            )
          });
    }
}
