/**
 * Created by ROGK on 2017/9/15.
 */
import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import { APIS } from '../const/api-const';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private USER_API=APIS.USER_API;
  private OPERATION_API=APIS.OPERATION_API;
  constructor(private http:Http) {}

  login(user:User):Observable<any> {
    return this.http
      .post(this.USER_API.LOGIN,user,{withCredentials:true})
      .map(res=> {
          return res;
      }).catch(this.handleError);
  }

  getCurrentUser(): User {
    if(localStorage.getItem('user') === '' || localStorage.getItem('user') === null) {
      return null;
    }
    var rawUser = JSON.parse(localStorage.getItem('user')) as User;
    return User.transfer(rawUser);
  }

  register(user:User):Promise<any> {
    return this.http
      .post(this.USER_API.REGISTER,user,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  getList():Promise<User[]> {
    return this.http
      .get(this.USER_API.LIST,{withCredentials:true}).toPromise()
      .then(res=> {
        var data=res.json().data as User[];
        return data.map(rawUser=> User.transfer(rawUser));
      })
      .catch(this.handleError);
  }

  getUser(userId:number):Promise<User> {
    return this.http
      .get(this.USER_API.GET.replace('{userId}',String(userId)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as User;
        return User.transfer(data);
      })
      .catch(this.handleError);
  }

  update(user:User):Promise<any> {
    return this.http
      .post(this.USER_API.UPDATE,user,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(userId:number):Promise<any> {
    return this.http
      .delete(this.USER_API.DELETE.replace('{userId}',String(userId)))
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  getOperations(rowsOnPage:number,activePage:number,sortBy:string,keyword:string):Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    if(keyword.trim()!='') {
      params.set('keywrod',keyword);
    }
    if(sortBy.trim()!='') {
      params.set('sortBy',sortBy);
    }
    let headers = new Headers({activePage: activePage, rowsOnPage: rowsOnPage});
    let options = new RequestOptions({headers: headers, search:params});
    return this.http
      .get(this.OPERATION_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  goBackUrl() {
    window.history.go(-1);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
