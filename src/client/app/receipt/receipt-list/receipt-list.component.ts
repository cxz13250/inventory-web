import {Component, OnInit} from '@angular/core';
import {Receipt} from "../../model/receipt";
import {ReceiptService} from "../../service/receipt-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ORDER_CONST} from "../../const/order-status";
import {UserService} from "../../service/user-service";

@Component({
  moduleId:module.id,
  selector:'receipt-list',
  templateUrl:'receipt-list.component.html'
})
export class ReceiptListComponent implements OnInit{
  receipts:Receipt[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=20;
  keyword:string='';
  check:boolean=false;
  create:boolean=false;
  checkStatus:number=ORDER_CONST.CHECKING;
  constructor(private receiptService:ReceiptService,private router:Router,private route:ActivatedRoute,private userService:UserService) {}
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
    if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==5){
      this.check=true;
    }
    if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==4){
      this.create=true;
    }
  }
  loadData() {
    this.receiptService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
        this.receipts=res.content as Receipt[];
        this.itemsTotal=res.totalElements;
      });
  }
  approve(order:Receipt){
    order.status=ORDER_CONST.APPROVED;
    this.receiptService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/receipt/list']);
      }
    });
  }
  reject(order:Receipt){
    order.status=ORDER_CONST.REJECTED;
    this.receiptService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/receipt/list']);
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
    this.router.navigate(['/receipt/list'],{queryParams : par});
  }
}
