import {Component, OnInit} from "@angular/core";
import {SaleStrategy} from "../../model/sale-strategy";
import {StrategyService} from "../../service/strategy-service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector:'strategy-list',
  templateUrl:'sale-strategy-list.html'
})
export class SaleStrategyList implements OnInit{
  strategies:SaleStrategy[];
  rowsOnPage:number=10;
  activePage:number=1;
  sortOrder:string='desc';
  sortBy:string='startTime';
  itemsTotal:number=0;
  keyword:string='';
  constructor(private strategyService:StrategyService,private router:Router,private route:ActivatedRoute) {}
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
  }
  loadData() {
    this.strategyService.getList(this.activePage,this.rowsOnPage,this.keyword,this.sortBy)
      .then(res=> {
        this.strategies=res.content as SaleStrategy[];
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
    this.router.navigate(['/sale/strategy/list'],{queryParams : par});
  }
}
