import {Component, OnInit} from '@angular/core';
import {Complimentary} from "../../model/complimentary";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ComplimentaryService} from "../../service/complimentary-service";
import {ORDER_CONST} from "../../const/order-status";
import {UserService} from "../../service/user-service";

@Component({
  moduleId:module.id,
  selector:'complimentary-list',
  templateUrl:'complimentary-list.html'
})
export class ComplimentaryListComponent implements OnInit{
  list:Complimentary[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=0;
  keyword:string='';
  check:boolean=false;
  create:boolean=false;
  checkStatus:number=ORDER_CONST.CHECKING;
  constructor(private router:Router,private route:ActivatedRoute,private complimentaryService:ComplimentaryService,private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((param:Params)=> {
      if (param['page'] !== undefined && param['page'].trim() !== '') {
        this.activePage = param['page'];
      }
      if (param['kw'] !== undefined && param['kw'].trim() !== '') {
        this.keyword = param['kw'];
      }
    });
    this.loadData();
    if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==5){
      this.check=true;
    }
    if(this.userService.getCurrentUser().roleId==1||this.userService.getCurrentUser().roleId==2){
      this.create=true;
    }
  }
  approve(order:Complimentary){
    order.status=ORDER_CONST.APPROVED;
    this.complimentaryService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/stock/complimentary/list']);
      }
    });
  }
  reject(order:Complimentary){
    order.status=ORDER_CONST.REJECTED;
    this.complimentaryService.update(order).then(res=> {
      if(res.status==200){
        this.router.navigate(['/stock/complimentary/list']);
      }
    });
  }
  loadData() {
    this.complimentaryService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
        this.itemsTotal=res.totalElements;
        this.list=res.content as Complimentary[];
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
    this.router.navigate(['/stock/complimentary/list'],{queryParams : par});
  }
}
