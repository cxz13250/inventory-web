import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {SaleOrder} from "../model/sale-order";

@Injectable()
export class SaleService {
  private SALE_API=APIS.SALE_API;
  constructor(private http:Http) {}
  getList(activePage:number,rowsOnPage:number,keyword:string,sortBy:string,type:boolean):Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    if(keyword.trim()!='') {
      params.set('keyword',keyword);
    }
    if(sortBy.trim()!='') {
      params.set('sortBy',sortBy);
    }
    params.set('type',String(type));
    let headers = new Headers({activePage: activePage, rowsOnPage: rowsOnPage});
    let options = new RequestOptions({search:params,headers: headers});
    return this.http
      .get(this.SALE_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  create(payment:SaleOrder):Promise<any> {
    return this.http
      .post(this.SALE_API.CREATE,payment,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(number:string):Promise<SaleOrder> {
    return this.http
      .get(this.SALE_API.GET.replace('{number}',number),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Account;
        return data;
      })
      .catch(this.handleError);
  }

  update(payment:SaleOrder):Promise<any> {
    return this.http
      .put(this.SALE_API.UPDATE,payment,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(number:string):Promise<any> {
    return this.http
      .delete(this.SALE_API.DELETE.replace('{number}',number),{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
