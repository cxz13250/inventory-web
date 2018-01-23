import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {StockService} from "../../service/stock-service";
import {StockOrder} from "../../model/stock-order";
import {STOCK_TYPE} from "../../const/stock-type";
import {ORDER_CONST} from "../../const/order-status";
import {Goods} from "../../model/goods";
import {GoodsService} from "../../service/goods-service";

@Component({
  moduleId:module.id,
  selector:'stock-detail',
  templateUrl:'stock-detail.component.html'
})
export class StockDetailComponent implements OnInit{
  order:StockOrder=new StockOrder();
  goods:Goods[]=[];
  orderId:number;
  title:string;
  label:string;
  edit:boolean=false;
  type:number=1;
  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router,private stockService:StockService,
              private goodService:GoodsService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['type']&&params['type'].trim()!='') {
        this.type=params['type'];
      }
      if(params['orderId']!=undefined&&params['orderId'].trim()!='') {
        this.orderId=params['orderId'];
        this.stockService.get(this.orderId).then(res=> {
          this.order=res;
          if(this.order.status==ORDER_CONST.DRAFT && (this.userService.getCurrentUser().roleId ==1 || this.userService.getCurrentUser().roleId ==2)){
            this.edit=true;
          }
        });
      }else {
        this.order=new StockOrder();
        this.order.type=this.type;
        this.order.goodId=-1;
        this.order.status=ORDER_CONST.DRAFT;
        this.edit=true;
      }
      this.setLabel();
    });
    this.goodService.getGoodsForPurchase().then(res=> {
      this.goods=res;
    });
  }
  setLabel() {
    if(this.orderId) {
      if(this.type == STOCK_TYPE.WARNING) {
        this.label='报警单详情';
        this.title='报警单列表';
      }else if(this.type == STOCK_TYPE.LOSE) {
        this.label='报损单详情';
        this.title='报损单列表';
      }else {
        this.label='报溢单详情';
        this.title='报溢单列表';
      }
    }else {
      if(this.type == STOCK_TYPE.WARNING) {
        this.label='添加报警单';
        this.title='报警单列表';
      }else if(this.type == STOCK_TYPE.LOSE) {
        this.label='添加报损单';
        this.title='报损单列表';
      }else {
        this.label='添加报溢单';
        this.title='报溢单列表';
      }
    }
  }
  save() {
    if (!this.order.id) {
      this.stockService.create(this.order).then(res => {
        if (res.status == 200)
          this.router.navigate(['/stock/list'], {queryParams: {type: this.type}});
      });
    }else {
      this.stockService.update(this.order).then(res => {
        if (res.status == 200)
          this.router.navigate(['/stock/list'], {queryParams: {type: this.type}});
      });
    }
  }
  submit(){
    this.order.status=ORDER_CONST.CHECKING;
    this.save();
  }
  delete() {
    this.stockService.delete(this.orderId).then(res=> {
      if(res.status == 200)
        this.router.navigate(['/stock/list'],{queryParams:{type:this.type}});
    });
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
