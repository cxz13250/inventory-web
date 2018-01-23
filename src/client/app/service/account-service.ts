import {Injectable} from "@angular/core";
import {APIS} from "../const/api-const";
import {Headers, Http, RequestOptions,URLSearchParams} from "@angular/http";
import {Account} from "../model/account";

@Injectable()
export class AccountService {
  private ACCOUNT_API=APIS.ACCOUNT_API;
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
      .get(this.ACCOUNT_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  getListForReceipt():Promise<any>{
    return this.http
      .get(this.ACCOUNT_API.RECEIPT,{withCredentials:true} )
      .toPromise()
      .then(res=> {
        var data=res.json().data as Account[];
        return data;
      })
      .catch(this.handleError);
  }

  create(account:Account):Promise<any> {
    return this.http
      .post(this.ACCOUNT_API.CREATE,account,{withCredentials:true}).toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(id:number):Promise<Account> {
    return this.http
      .get(this.ACCOUNT_API.GET.replace('{accountId}',String(id)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Account;
        return data;
      })
      .catch(this.handleError);
  }

  update(account:Account):Promise<any> {
    return this.http
      .put(this.ACCOUNT_API.UPDATE,account,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(id:number):Promise<any> {
    return this.http
      .delete(this.ACCOUNT_API.DELETE.replace('{accountId}',String(id)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  getBank(bankNo:string):Promise<any> {
    return this.http
      .get(this.ACCOUNT_API.BANK.replace('{bankNo}',bankNo),{withCredentials:true})
      .toPromise()
      .then(res=>{
        return res.json();
      })
      .catch(this.handleError);
  }

  getBanks():Promise<any> {
    return this.http.get('/assets/json/bank.json')
      .toPromise()
      .then(res=> {
        return res.json();
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
