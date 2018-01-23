import { Component, OnInit } from '@angular/core';
import { Goods } from '../../model/goods';
import {GoodsService} from '../../service/goods-service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  moduleId:module.id,
  selector:'goods-list',
  templateUrl:'goods-list.component.html'
})
export class GoodsListComponent implements OnInit {
  goods:Goods[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='name';
  itemsTotal:number=20;
  keyword:string='';
  constructor(private goodsService:GoodsService,private router:Router,private route:ActivatedRoute) {
  }
  loadData() {
    this.goodsService.getGoodsList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
        this.goods=res.content as Goods[];
        this.itemsTotal=res.totalElements;
      });
  }
  ngOnInit() {
    this.route.queryParams.forEach((param:Params)=> {
      if(param['page']!==undefined && param['page'].trim()!=='') {
        this.activePage=param['page'];
      }
      if(param['kw']!==undefined && param['kw'].trim()!=='') {
        this.keyword=param['kw'];
      }
      this.loadData();
    });
  }
  onPageChange(event:any) {
    this.rowsOnPage = event.rowsOnPage;
    this.activePage = event.activePage;
    this.loadData();
    this.changeUrl();
  }
  onSortOrder(event:any) {
    this.loadData();
  }
  search() {
    this.loadData();
  }
  changeUrl() {
    var par:any = {};
    par['page'] = this.activePage;
    if(this.keyword !== '') {
      par['kw'] = this.keyword;
    }
    this.router.navigate(['/goods/list'],{queryParams : par});
  }
}
