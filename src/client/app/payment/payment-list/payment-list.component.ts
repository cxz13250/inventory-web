import {Component, OnInit} from '@angular/core';
import {Payment} from "../../model/payment";
import {PaymentService} from "../../service/payment-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ORDER_CONST} from "../../const/order-status";
import {UserService} from "../../service/user-service";

@Component({
  moduleId:module.id,
  selector:'payment-list',
  templateUrl:'payment-list.component.html'
})
export class PaymentListComponent implements OnInit{
  payments:Payment[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='';
  sortBy:string='createTime';
  itemsTotal:number=20;
  keyword:string='';
  check:boolean=false;
  create:boolean=false;
  checkStatus:number=ORDER_CONST.CHECKING;
  constructor(private paymentService:PaymentService,private router:Router,private route:ActivatedRoute,private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((param:Params)=> {
      if(param['page']!==undefined && param['page'].trim()!=='') {
        this.activePage=param['page'];
      }
      if(param['kw']!==undefined && param['kw'].trim()!=='') {
        this.keyword=param['kw'];
      }
      this.loadData();
      if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==5){
        this.check=true;
      }
      if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==4){
        this.create=true;
      }
    });
  }
  loadData() {
    this.paymentService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
      this.payments=res.content as Payment[];
      this.itemsTotal=res.totalElements;
    });
  }
  approve(order:Payment){
    order.status=ORDER_CONST.APPROVED;
    this.paymentService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/payment/list']);
      }
    });
  }
  reject(order:Payment){
    order.status=ORDER_CONST.REJECTED;
    this.paymentService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/payment/list']);
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
    this.router.navigate(['/payment/list'],{queryParams : par});
  }
}
