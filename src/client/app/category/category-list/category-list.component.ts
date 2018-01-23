import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/category";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CategoryService} from "../../service/category-service";

@Component({
  moduleId:module.id,
  selector:'category-list',
  templateUrl:'category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categories:Category[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='createTime';
  itemsTotal:number=0;
  keyword:string='';
  constructor(private router:Router,private categoryService:CategoryService,private route:ActivatedRoute) {}
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
    this.categoryService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
        this.categories=res.content;
        this.itemsTotal=res.totalElements;
      });
  }
  validate(id?:number,name?:string):any {
    if(id) {
      if (id == -1)
        return '无';
      else
        return id;
    }
    if (!name || name.trim() == '')
      return '无';
    else
      return name;
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
    this.router.navigate(['/category/list'],{queryParams : par});
  }
}
