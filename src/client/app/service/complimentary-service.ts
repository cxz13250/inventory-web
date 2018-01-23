import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Complimentary} from "../model/complimentary";

@Injectable()
export class ComplimentaryService{
  private COMPLIMENTARY_API=APIS.COMPLIMENTARY_API;
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
      .get(this.COMPLIMENTARY_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  create(complimentary:Complimentary):Promise<any> {
    return this.http
      .post(this.COMPLIMENTARY_API.CREATE,complimentary,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(id:number):Promise<Complimentary> {
    return this.http
      .get(this.COMPLIMENTARY_API.GET.replace('{orderId}',String(id)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Complimentary;
        return data;
      })
      .catch(this.handleError);
  }

  update(complimentary:Complimentary):Promise<any> {
    return this.http
      .put(this.COMPLIMENTARY_API.UPDATE,complimentary,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(id:number):Promise<any> {
    return this.http
      .delete(this.COMPLIMENTARY_API.DELETE.replace('{orderId}',String(id)),{withCredentials:true})
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
