import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions,URLSearchParams} from "@angular/http";
import {Payment} from "../model/payment";

@Injectable()
export class PaymentService {
  private PAYMENT_API=APIS.PAYMENT_API;
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
      .get(this.PAYMENT_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  create(payment:Payment):Promise<any> {
    return this.http
      .post(this.PAYMENT_API.CREATE,payment,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(number:string):Promise<Payment> {
    return this.http
      .get(this.PAYMENT_API.GET.replace('{number}',number),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Payment;
        return data;
      })
      .catch(this.handleError);
  }

  update(payment:Payment):Promise<any> {
    return this.http
      .put(this.PAYMENT_API.UPDATE,payment,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(number:string):Promise<any> {
    return this.http
      .delete(this.PAYMENT_API.DELETE.replace('{number}',number),{withCredentials:true})
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
