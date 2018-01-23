import {Component, OnInit} from '@angular/core';
import {Custom} from "../../model/custom";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CustomService} from "../../service/custom-service";

@Component({
  moduleId:module.id,
  selector:'custom-list',
  templateUrl:'custom-list.component.html'
})
export class CustomListComponent implements OnInit {
  customs:Custom[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=20;
  keyword:string='';
  constructor(private router:Router,private route:ActivatedRoute,private customService:CustomService) {}
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
    this.customService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
      var data=res.content as Custom[];
      this.customs=data.map(rawCustom=> Custom.transfer(rawCustom));
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
    this.router.navigate(['/custom/list'],{queryParams : par});
  }
}
