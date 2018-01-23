import {Component, OnInit} from '@angular/core';
import {Purchase} from "../../model/purchase";
import {GoodsItem} from "../../model/goods-item";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PurchaseService} from "../../service/purchase-service";
import {PURCHASE_TYPE} from "../../const/purchase-type";
import {Goods} from "../../model/goods";
import {UserService} from "../../service/user-service";
import {GoodsService} from "../../service/goods-service";
import {ORDER_CONST} from "../../const/order-status";
import {Custom} from "../../model/custom";
import {CustomService} from "../../service/custom-service";

declare var show_stack_topleft: any;
declare var $ : any;
@Component({
  moduleId:module.id,
  selector:'purchase-detail',
  templateUrl:'purchase-detail.component.html'
})
export class PurchaseDetailComponent implements OnInit{
  purchase:Purchase=new Purchase();
  goodsItems:GoodsItem[];
  goodItem:GoodsItem=new GoodsItem();
  goods:Goods[]=[];
  customs:Custom[]=[];
  number:string;
  edit:boolean=false;
  label:string;
  title:string;
  type:number;
  constructor(private router:Router,private route:ActivatedRoute,private purchaseService:PurchaseService,private userService:UserService,
              private goodService:GoodsService,private customService:CustomService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['type']!=undefined&&params['type'].trim()!='') {
        this.type=params['type'];
        if(this.type==PURCHASE_TYPE.INPUT){
          this.title='进货单列表';
        }else {
          this.title='退货单列表';
        }
      }
      if(params['number']!=undefined&&params['number'].trim()!='') {
        this.number=params['number'];
        if(this.type==PURCHASE_TYPE.INPUT){
          this.label='进货单详情';
        }else {
          this.label='退货单详情';
        }
        this.purchaseService.get(this.number).then(res=> {
          this.purchase=res;
          if(this.purchase.status==ORDER_CONST.DRAFT && (this.userService.getCurrentUser().roleId ==1 || this.userService.getCurrentUser().roleId ==3)){
            this.edit=true;
          }
          this.goodsItems=this.purchase.goodsItemVOS;
        });
      }else {
        this.purchase=new Purchase();
        this.edit=true;
        this.purchase.total=0;
        this.purchase.customId=-1;
        this.purchase.status=ORDER_CONST.DRAFT;
        this.goodsItems=[];
        if(this.type==PURCHASE_TYPE.INPUT){
          this.label='添加进货单';
          this.purchase.type=true;
        }else {
          this.label='添加退货单';
          this.purchase.type=false;
        }
      }
    });
    this.goodService.getGoodsForPurchase().then(res=> {
      this.goods=res;
    });
    this.customService.getListForReceipt().then(res=> {
      this.customs=res;
    });
  }

  save() {
    if(this.purchase.customId==-1){
      show_stack_topleft('error','请选择供应商');
      return;
    }
    if(this.purchase.number) {
      this.purchase.goodsItemVOS=this.goodsItems;
      this.purchaseService.update(this.purchase)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/purchase/list'],{queryParams:{type:this.type}});
          }
        });
    }else {
      this.purchase.operator=this.userService.getCurrentUser().name;
      this.purchase.goodsItemVOS=this.goodsItems;
      this.purchaseService.create(this.purchase)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/purchase/list'],{queryParams:{type:this.type}});
          }
        });
    }
  }
  submit(){
    this.purchase.status=ORDER_CONST.CHECKING;
    this.save();
  }
  delete() {
    this.purchaseService.delete(this.number).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/purchase/list'],{queryParams:{type:this.type}});
      }else {
        show_stack_topleft('error','删除失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }

  createItem() {
    this.goodItem=new GoodsItem();
    this.goodItem.goodId=-1;
    this.goodItem.price=0;
    this.goodItem.number=0;
    this.goodItem.sum=0;
    $('#purchase').modal('show');

  }

  deleteItem(i:number) {
    this.goodsItems.splice(i,1);
    this.computeTotal();
  }

  setItem(){
    this.goods.forEach((good:Goods)=> {
      if(good.id==this.goodItem.goodId){
        this.goodItem.goodName=good.name;
        this.goodItem.goodModel=good.model;
        this.goodItem.price=good.retailPrice;
      }
    });
  }
  send() {
    if(this.goodItem.goodId==-1) {
      show_stack_topleft('error','请选择商品');
      return;
    }
    this.goodsItems.push(this.goodItem);
    this.computeTotal();
  }

  cancel() {
    $('#purchase').modal('hide');
  }

  computeTotal() {
    this.purchase.total=0;
    this.goodsItems.forEach((item:GoodsItem)=> {
      this.purchase.total=this.purchase.total+item.sum;
    });
  }

  setItemSum() {
    this.goodItem.sum=this.goodItem.price*this.goodItem.number;
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
