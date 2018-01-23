import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {StockOrder} from "../model/stock-order";

@Injectable()
export class StockService {
  private STOCK_API=APIS.STOCK_API;
  constructor(private http:Http) {}
  getList(activePage:number,rowsOnPage:number,keyword:string,sortBy:string,type:number):Promise<any> {
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
      .get(this.STOCK_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  create(order:StockOrder):Promise<any> {
    return this.http
      .post(this.STOCK_API.CREATE,order,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(number:number):Promise<StockOrder> {
    return this.http
      .get(this.STOCK_API.GET.replace('{orderId}',String(number)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Account;
        return data;
      })
      .catch(this.handleError);
  }

  update(order:StockOrder):Promise<any> {
    return this.http
      .put(this.STOCK_API.UPDATE,order,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(number:number):Promise<any> {
    return this.http
      .delete(this.STOCK_API.DELETE.replace('{orderId}',String(number)),{withCredentials:true})
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
