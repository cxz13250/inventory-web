import {Component, OnInit} from '@angular/core';
import {Complimentary} from "../../model/complimentary";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ComplimentaryService} from "../../service/complimentary-service";
import {UserService} from "../../service/user-service";
import {Goods} from "../../model/goods";
import {GoodsService} from "../../service/goods-service";
import {Custom} from "../../model/custom";
import {CustomService} from "../../service/custom-service";
import {ComplimentaryItem} from "../../model/complimentary-item";
import {ORDER_CONST} from "../../const/order-status";

declare var show_stack_topleft: any;
declare var $ : any;
@Component({
  moduleId:module.id,
  selector:'complimentary-detail',
  templateUrl:'complimentary-detail.html'
})
export class ComplimentaryDetailComponent implements OnInit{
  complimentary:Complimentary=new Complimentary();
  goods:Goods[];
  customs:Custom[];
  items:ComplimentaryItem[];
  cItem:ComplimentaryItem=new ComplimentaryItem();
  id:number;
  label:string;
  edit:boolean=false;
  constructor(private router:Router,private route:ActivatedRoute,private complimentaryService:ComplimentaryService,
              private userService:UserService,private goodService:GoodsService,private customService:CustomService) {
  }
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['id']!=undefined&&params['id'].trim()!='') {
        this.id=params['id'];
        this.edit=true;
        this.label='赠送单详情';
        this.complimentaryService.get(this.id).then(res=> {
          this.complimentary=res;
          this.items=this.complimentary.items;
          if(this.complimentary.status==ORDER_CONST.DRAFT){
            this.edit=true;
          }
        });
      }else {
        this.complimentary=new Complimentary();
        this.items=[];
        this.edit=true;
        this.complimentary.customId=-1;
        this.complimentary.total=0;
        this.complimentary.status=ORDER_CONST.DRAFT;
        this.label='添加赠送单';
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
    if(this.complimentary.customId==-1){
      show_stack_topleft('error','请选择客户');
      return;
    }
    if(this.complimentary.id) {
      this.complimentary.items=this.items;
      this.complimentaryService.update(this.complimentary)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/stock/complimentary/list']);
          }
        });
    }else {
      this.complimentary.items=this.items;
      this.complimentaryService.create(this.complimentary)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/stock/complimentary/list']);
          }
        });
    }
  }
  submit(){
    this.complimentary.status=ORDER_CONST.CHECKING;
    this.save();
  }
  delete() {
    this.complimentaryService.delete(this.id).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/stock/complimentary/list']);
      }else {
        show_stack_topleft('error','删除赠送单失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  createItem() {
    this.cItem=new ComplimentaryItem();
    this.cItem.price=0;
    this.cItem.money=0;
    this.cItem.sum=0;
    this.cItem.goodName='-1';
    $('#complimentary').modal('show');
  }
  deleteItem(i:number) {
    this.items.splice(i,1);
    this.computeTotal();
  }

  setItem(){
    this.goods.forEach((good:Goods)=> {
      if(good.name==this.cItem.goodName){
        this.cItem.price=good.retailPrice;
      }
    });
  }
  send() {
    if(this.cItem.goodName=='-1') {
      show_stack_topleft('error','请选择商品');
      return;
    }
    this.items.push(this.cItem);
    this.computeTotal();
  }

  cancel() {
    $('#complimentary').modal('hide');
  }

  computeTotal() {
    this.complimentary.total=0;
    this.items.forEach((item:ComplimentaryItem)=> {
      this.complimentary.total=this.complimentary.total+item.money;
    });
  }

  setItemSum() {
    this.cItem.money=this.cItem.price*this.cItem.sum;
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
