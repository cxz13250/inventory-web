import { Injectable } from "@angular/core";
import { APIS } from "../const/api-const";
import { Http } from "@angular/http";
import { RequestOptions, URLSearchParams } from "@angular/http";
import { ManageInfo } from "../model/manage-info";

@Injectable()
export class ManageService {
    private MANAGE_API=APIS.MANAGE_API;
    constructor(private http:Http) {}
    getMangeInfo(startTime:number,endTime:number):Promise<ManageInfo> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('startTime',String(startTime));
        params.set('endTime',String(endTime));
        let options=new RequestOptions({params:params});
        return this.http
            .get(this.MANAGE_API.INFO,options)
            .toPromise()
            .then(res=> {
                return res.json().data as ManageInfo;
            })
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}