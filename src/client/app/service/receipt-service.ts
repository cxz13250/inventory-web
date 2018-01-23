import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions,URLSearchParams} from "@angular/http";
import {Receipt} from "../model/receipt";

@Injectable()
export class ReceiptService {
  private RECEIPT_API=APIS.RECEIPT_API;
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
      .get(this.RECEIPT_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  create(receipt:Receipt):Promise<any> {
    return this.http
      .post(this.RECEIPT_API.CREATE,receipt,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(number:string):Promise<Receipt> {
    return this.http
      .get(this.RECEIPT_API.GET.replace('{number}',number),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Receipt;
        return data;
      })
      .catch(this.handleError);
  }

  update(receipt:Receipt):Promise<any> {
    return this.http
      .put(this.RECEIPT_API.UPDATE,receipt,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(number:string):Promise<any> {
    return this.http
      .delete(this.RECEIPT_API.DELETE.replace('{number}',number),{withCredentials:true})
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
