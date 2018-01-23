import {Component, OnInit} from '@angular/core';
import {Account} from "../../model/account";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../service/account-service";

@Component({
  moduleId:module.id,
  selector:'account-list',
  templateUrl:'account-list.component.html'
})
export class AccountListComponent implements OnInit {
  accounts:Account[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='asc';
  sortBy:string='createTime';
  itemsTotal:number=0;
  keyword:string='';
  constructor(private router:Router,private route:ActivatedRoute,private accountService:AccountService) {}
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
  loadData() {
    this.accountService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
        this.accounts=res.content as Account[];
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
    this.router.navigate(['/account/list'],{queryParams : par});
  }
}
