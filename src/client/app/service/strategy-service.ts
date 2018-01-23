import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {SaleStrategy} from "../model/sale-strategy";

@Injectable()
export class StrategyService {
  private STRATEGY_API=APIS.STRATEGY_API;
  constructor(private http:Http) {}
  getList(activePage:number,rowsOnPage:number,keyword:string,sortBy:string):Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    if(keyword.trim()!='') {
      params.set('keyword',keyword);
    }
    if(sortBy.trim()!='') {
      params.set('sortBy',sortBy);
    }
    let headers = new Headers({activePage: activePage, rowsOnPage: rowsOnPage});
    let options = new RequestOptions({search:params,headers: headers});
    return this.http
      .get(this.STRATEGY_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  create(strategy:SaleStrategy):Promise<any> {
    return this.http
      .post(this.STRATEGY_API.CREATE,strategy,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(id:number):Promise<SaleStrategy> {
    return this.http
      .get(this.STRATEGY_API.GET.replace('{id}',String(id)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as SaleStrategy;
        return data;
      })
      .catch(this.handleError);
  }

  update(strategy:SaleStrategy):Promise<any> {
    return this.http
      .put(this.STRATEGY_API.UPDATE,strategy,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(id:number):Promise<any> {
    return this.http
      .delete(this.STRATEGY_API.DELETE.replace('{id}',String(id)),{withCredentials:true})
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
