import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Operation} from "../../model/operation";
import {UserService} from "../../service/user-service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector:'operation-list',
  templateUrl:'operation-list.component.html'
})
export class OperationListComponent implements OnInit {
  operations:Operation[]=[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=20;
  keyword:string='';
  constructor(private userService:UserService,private router:Router,private route:ActivatedRoute) {}
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
    this.userService.getOperations(this.rowsOnPage,this.activePage,this.sortBy,this.keyword)
      .then(res=> {
        this.operations=res.content as Operation[];
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
    this.router.navigate(['/user/operation'],{queryParams : par});
  }
}
