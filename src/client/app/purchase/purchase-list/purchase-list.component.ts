import {Component, OnInit} from '@angular/core';
import {Purchase} from "../../model/purchase";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PurchaseService} from "../../service/purchase-service";
import {PURCHASE_TYPE} from "../../const/purchase-type";
import {ORDER_CONST} from "../../const/order-status";
import {UserService} from "../../service/user-service";

@Component({
  moduleId:module.id,
  selector:'purchase-list',
  templateUrl:'purchase-list.component.html'
})
export class PurchaseListComponent implements OnInit {
  purchases:Purchase[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=0;
  keyword:string='';
  label:string;
  button:string;
  type:boolean=true;
  io:number=PURCHASE_TYPE.INPUT;
  check:boolean=false;
  create:boolean=false;
  checkStatus:number=ORDER_CONST.CHECKING;
  constructor(private router:Router,private route:ActivatedRoute,private purchaseService:PurchaseService,private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((param:Params)=> {
      if(param['page']!==undefined && param['page'].trim()!=='') {
        this.activePage=param['page'];
      }
      if(param['kw']!==undefined && param['kw'].trim()!=='') {
        this.keyword=param['kw'];
      }
      if(param['type']==PURCHASE_TYPE.OUTPUT) {
        this.type=false;
        this.io=PURCHASE_TYPE.OUTPUT;
        this.label='退货单列表';
        this.button='添加退货单';
      }
      else {
        this.type=true;
        this.label='进货单列表';
        this.button='添加进货单';
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
    this.purchaseService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy,this.type)
      .then(res=> {
      this.purchases=res.content as Purchase[];
      this.itemsTotal=res.totalElements;
    });
  }
  approve(order:Purchase){
    order.status=ORDER_CONST.APPROVED;
    this.purchaseService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/purchase/list'],{queryParams:{type:this.io}});
      }
    });
  }
  reject(order:Purchase){
    order.status=ORDER_CONST.REJECTED;
    this.purchaseService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/purchase/list'],{queryParams:{type:this.io}});
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
    this.router.navigate(['/purchase/list'],{queryParams : par});
  }
}
