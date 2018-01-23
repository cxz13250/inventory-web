import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions,URLSearchParams} from "@angular/http";
import {APIS} from "../const/api-const";
import {Category} from "../model/category";

@Injectable()
export class CategoryService {
  private CATEGORY_API=APIS.CATEGORY_API;
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
      .get(this.CATEGORY_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  getListForGood():Promise<any> {
    return this.http
      .get(this.CATEGORY_API.GOODS,{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Category[];
        return data;
      })
      .catch(this.handleError);
  }

  getListForCategory():Promise<any> {
    return this.http
      .get(this.CATEGORY_API.CATEGORY,{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Category[];
        return data;
      })
      .catch(this.handleError);
  }

  create(category:Category):Promise<any> {
    return this.http
      .post(this.CATEGORY_API.CREATE,category,{withCredentials:true}).toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  get(id:number):Promise<Category> {
    return this.http
      .get(this.CATEGORY_API.GET.replace('{categoryId}',String(id)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Category;
        return data;
      })
      .catch(this.handleError);
  }

  update(category:Category):Promise<any> {
    return this.http
      .put(this.CATEGORY_API.UPDATE,category,{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json();
        return data;
      })
      .catch(this.handleError);
  }

  delete(id:number):Promise<any> {
    return this.http
      .delete(this.CATEGORY_API.DELETE.replace('{categoryId}',String(id)),{withCredentials:true})
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
