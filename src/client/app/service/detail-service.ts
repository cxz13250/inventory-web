import { Injectable } from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions,URLSearchParams} from "@angular/http";
import { SaleDetail } from "../model/sale-detail";

@Injectable()
export class DetailService{
    private DETAIL_API=APIS.DETAIL_API;
    constructor(private http:Http) {}
    getSaleDetail(startTime:number,endTime:number,activePage:number,rowsOnPage:number,sortBy:string):Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('startTime',String(startTime));
        params.set('endTime',String(endTime));
        params.set('sortBy',String(sortBy));
        let headers = new Headers({activePage: activePage, rowsOnPage: rowsOnPage});
        let options = new RequestOptions({search:params,headers: headers});
        return this.http
            .get(this.DETAIL_API.GET,options)
            .toPromise()
            .then(res=> {
                var data=res.json().data;
                return data;
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}