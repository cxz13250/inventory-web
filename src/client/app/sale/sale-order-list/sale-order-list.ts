import {Component, OnInit} from '@angular/core';
import {SaleOrder} from "../../model/sale-order";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SaleService} from "../../service/sale-service";
import {SALE_TYPE} from "../../const/sale-type";
import {PURCHASE_TYPE} from "../../const/purchase-type";
import {ORDER_CONST} from "../../const/order-status";
import {UserService} from "../../service/user-service";

@Component({
  moduleId:module.id,
  selector:'sale-order-list',
  templateUrl:'sale-order-list.html'
})
export class SaleOrderListComponent implements OnInit{
  orders:SaleOrder[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=0;
  keyword:string='';
  label:string;
  button:string;
  type:boolean=true;
  io:number=SALE_TYPE.OUTPUT;
  check:boolean=false;
  create:boolean=false;
  checkStatus:number=ORDER_CONST.CHECKING;
  constructor(private router:Router,private route:ActivatedRoute,private saleService:SaleService,private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((param:Params)=> {
      if(param['page']!==undefined && param['page'].trim()!=='') {
        this.activePage=param['page'];
      }
      if(param['kw']!==undefined && param['kw'].trim()!=='') {
        this.keyword=param['kw'];
      }
      if(param['type']==SALE_TYPE.OUTPUT) {
        this.type=true;
        this.label='销售单列表';
        this.button='添加销售单';
      }
      else {
        this.type=false;
        this.label='退货单列表';
        this.button='添加退货单';
        this.io=SALE_TYPE.INPUT;
      }
      this.loadData();
      if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==5){
        this.check=true;
      }
      if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==3){
        this.create=true;
      }
    });
  }
  loadData() {
    this.saleService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy,this.type)
      .then(res=> {
        this.orders=res.content as SaleOrder[];
        this.itemsTotal=res.totalElements;
      });
  }
  approve(order:SaleOrder){
    order.status=ORDER_CONST.APPROVED;
    this.saleService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/sale/order/list'],{queryParams:{type:this.io}});
      }
    });
  }
  reject(order:SaleOrder){
    order.status=ORDER_CONST.REJECTED;
    this.saleService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/sale/order/list'],{queryParams:{type:this.io}});
      }
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
    if(this.type) {
      par['type'] = 1;
    }else {
      par['type'] = 0;
    }
    this.router.navigate(['/sale/order/list'],{queryParams : par});
  }
}
