import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import { Goods } from '../model/goods';
import { APIS } from '../const/api-const';

@Injectable()
export class GoodsService {
  private GOODS_API=APIS.GOODS_API;
  constructor(private http:Http) {}

  getGoodsList(activePage:number,rowsOnPage:number,keyword:string,sortBy:string):Promise<any> {
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
      .get(this.GOODS_API.LIST,options)
      .toPromise()
      .then(res=> {
        var data=res.json().data;
        return data;
      })
      .catch(this.handleError);
  }

  getGoodsForPurchase():Promise<any> {
    return this.http
      .get(this.GOODS_API.PURCHASE,{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Goods[];
        return data;
      })
      .catch(this.handleError);
  }

  createGood(goods:Goods):Promise<any> {
    return this.http
      .post(this.GOODS_API.CREATE,goods,{withCredentials:true}).toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  getGood(goodsId:number):Promise<Goods> {
    return this.http
      .get(this.GOODS_API.GET.replace('{goodsId}',String(goodsId)),{withCredentials:true})
      .toPromise()
      .then(res=> {
        var data=res.json().data as Goods;
        return Goods.transfer(data);
      })
      .catch(this.handleError);
  }

  updateGood(goods:Goods):Promise<any> {
    return this.http
      .put(this.GOODS_API.UPDATE,goods,{withCredentials:true})
      .toPromise()
      .then(res=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  deleteGood(goodsId:number):Promise<any> {
    return this.http
      .delete(this.GOODS_API.DELETE.replace('{goodsId}',String(goodsId)),{withCredentials:true})
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
