import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Custom} from "../model/custom";

@Injectable()
export class CustomService {
  private CUSTOM_API=APIS.CUSTOM_API;
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
      .get(this.CUSTOM_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  getListForSALE():Promise<any>{
    return this.http
      .get(this.CUSTOM_API.SALE,{withCredentials:true} )
      .toPromise()
      .then(res=> {
        var data=res.json().data as Custom[];
        return data;
      })
      .catch(this.handleError);
  }

  getListForReceipt():Promise<any>{
    return this.http
      .get(this.CUSTOM_API.RECEIPT,{withCredentials:true} )
      .toPromise()
      .then(res=> {
        var data=res.json().data as Custom[];
        return data;
      })
      .catch(this.handleError);
  }

  create(custom:Custom):Promise<any> {
    return this.http
      .post(this.CUSTOM_API.CREATE,custom,{withCredentials:true}).toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(id:number):Promise<Custom> {
    return this.http
      .get(this.CUSTOM_API.GET.replace('{customId}',String(id)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Custom;
        return data;
      })
      .catch(this.handleError);
  }

  update(custom:Custom):Promise<any> {
    return this.http
      .put(this.CUSTOM_API.UPDATE,custom,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(id:number):Promise<any> {
    return this.http
      .delete(this.CUSTOM_API.DELETE.replace('{customId}',String(id)),{withCredentials:true})
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
