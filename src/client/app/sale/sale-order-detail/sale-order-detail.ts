import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {SaleService} from "../../service/sale-service";
import {SaleOrder} from "../../model/sale-order";
import {SaleOrderItem} from "../../model/sale-order-item";
import {SALE_TYPE} from "../../const/sale-type";
import {Custom} from "../../model/custom";
import {CustomService} from "../../service/custom-service";
import {UserService} from "../../service/user-service";
import {Goods} from "../../model/goods";
import {GoodsService} from "../../service/goods-service";
import {ORDER_CONST} from "../../const/order-status";

declare var show_stack_topleft: any;
declare var $ : any;
@Component({
  moduleId:module.id,
  selector:'sale-order-detail',
  templateUrl:'sale-order-detail.html'
})
export class SaleOrderDetailComponent implements OnInit{
  sale:SaleOrder=new SaleOrder();
  items:SaleOrderItem[];
  orderItem:SaleOrderItem=new SaleOrderItem();
  customs:Custom[];
  goods:Goods[];
  number:string;
  edit:boolean=false;
  label:string;
  title:string;
  type:number;
  constructor(private router:Router,private route:ActivatedRoute,private saleService:SaleService,private customService:CustomService,
              private userService:UserService,private goodService:GoodsService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['type']!=undefined&&params['type'].trim()!='') {
        this.type=params['type'];
        if(this.type==SALE_TYPE.OUTPUT){
          this.title='销售单列表';
        }else {
          this.title='退货单列表';
        }
      }
      if(params['number']!=undefined&&params['number'].trim()!='') {
        this.number=params['number'];
        if(this.type==SALE_TYPE.OUTPUT){
          this.label='销售单详情';
        }else {
          this.label='退货单详情';
        }
        this.saleService.get(this.number).then(res=> {
          this.sale=res;
          if(this.sale.status == ORDER_CONST.DRAFT){
            this.edit=true;
          }
          this.items=this.sale.orderItems;
        });
      }else {
        this.sale=new SaleOrder();
        this.sale.status=ORDER_CONST.DRAFT;
        this.sale.total=0;
        this.sale.discount=0;
        this.sale.finalTotal=0;
        this.edit=true;
        this.sale.customId=-1;
        this.items=[];
        if(this.type==SALE_TYPE.OUTPUT){
          this.label='添加销售单';
          this.sale.type=true;
        }else {
          this.label='添加退货单';
          this.sale.type=false;
        }
      }
    });
    this.customService.getListForSALE().then(res=> {
      this.customs=res;
    });
    this.goodService.getGoodsForPurchase().then(res=> {
      this.goods=res;
    });
  }
  save() {
    if(this.sale.customId==-1){
      show_stack_topleft('error','请选择销售商');
      return;
    }
    if(this.sale.number) {
      this.sale.orderItems=this.items;
      this.saleService.update(this.sale)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/sale/order/list'],{queryParams:{type:this.type}});
          }
        });
    }else {
      this.sale.operator=this.userService.getCurrentUser().name;
      this.sale.orderItems=this.items;
      this.saleService.create(this.sale)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/sale/order/list'],{queryParams:{type:this.type}});
          }
        });
    }
  }
  submit(){
    this.sale.status=ORDER_CONST.CHECKING;
    this.save();
  }
  delete() {
    this.saleService.delete(this.number).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/sale/order/list'],{queryParams:{type:this.type}});
      }else {
        show_stack_topleft('error','删除失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }

  createItem() {
    this.orderItem=new SaleOrderItem();
    this.orderItem.goodId=-1;
    this.orderItem.price=0;
    this.orderItem.total=0;
    this.orderItem.sum=0;
    $('#sale').modal('show');
  }
  deleteItem(i:number) {
    this.items.splice(i,1);
    this.computeTotal();
  }

  setItem(){
    this.goods.forEach((good:Goods)=> {
      if(good.id==this.orderItem.goodId){
        this.orderItem.goodName=good.name;
        this.orderItem.goodModel=good.model;
        this.orderItem.price=good.retailPrice;
      }
    });
  }
  send() {
    if(this.orderItem.goodId==-1) {
      show_stack_topleft('error','请选择商品');
      return;
    }
    this.items.push(this.orderItem);
    this.computeTotal();
  }

  cancel() {
    $('#sale').modal('hide');
  }

  computeTotal() {
    this.sale.total=0;
    this.items.forEach((item:SaleOrderItem)=> {
      this.sale.total=this.sale.total+item.total;
    });
  }

  computeFinal() {
    this.sale.finalTotal=this.sale.total-this.sale.discount;
  }

  setItemSum() {
    this.orderItem.total=this.orderItem.price*this.orderItem.sum;
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
