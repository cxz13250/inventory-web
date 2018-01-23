import {Component, OnInit} from '@angular/core';
import {StockOrder} from "../../model/stock-order";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {STOCK_TYPE} from "../../const/stock-type";
import {StockService} from "../../service/stock-service";
import {UserService} from "../../service/user-service";
import {ORDER_CONST} from "../../const/order-status";

declare var show_stack_topleft:any;
@Component({
  moduleId:module.id,
  selector:'stock-list',
  templateUrl:'stock-list.component.html'
})
export class StockListComponent implements OnInit{
  orders:StockOrder[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=20;
  keyword:string='';
  label:string;
  button:string;
  type:number=1;
  check:boolean=false;
  create:boolean=false;
  checkStatus:number=ORDER_CONST.CHECKING;
  constructor(private route:ActivatedRoute,private stockService:StockService,private router:Router,private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((param:Params)=> {
      if(param['page']!==undefined && param['page'].trim()!=='') {
        this.activePage=param['page'];
      }
      if(param['kw']!==undefined && param['kw'].trim()!=='') {
        this.keyword=param['kw'];
      }
      if(param['type']!==undefined && param['type'].trim()!=='') {
        this.type=param['type'];
      }
      if(this.type==STOCK_TYPE.WARNING) {
        this.label='报警单列表';
        this.button='添加报警单';
      }
      else if(this.type==STOCK_TYPE.LOSE) {
        this.label='报损单列表';
        this.button='添加报损单';
      }else {
        this.label='报溢单列表';
        this.button='添加报溢单';
      }
      this.loadData();
      if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==5){
        this.check=true;
      }
      if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==2){
        this.create=true;
      }
    });
  }
  approve(order:StockOrder){
    order.status=ORDER_CONST.APPROVED;
    this.stockService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/stock/list'], {queryParams: {type: this.type}});
      }
    });
  }
  reject(order:StockOrder){
    order.status=ORDER_CONST.REJECTED;
    this.stockService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/stock/list'], {queryParams: {type: this.type}});
      }
    });
  }
  loadData() {
    this.stockService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy,this.type)
      .then(res=> {
        this.orders=res.content as StockOrder[];
        this.itemsTotal=res.totalElements;
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
    par['type']=this.type;
    this.router.navigate(['/stock/list'],{queryParams : par});
  }
}
