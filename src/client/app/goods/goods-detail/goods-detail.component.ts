import {Component, OnInit} from '@angular/core';
import {Goods} from "../../model/goods";
import {GOODS_LIST} from "../../mock/mock-goodsList";
import {GoodsService} from "../../service/goods-service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {Category} from "../../model/category";
import {CATEGORY_LIST} from "../../mock/mock-categoryList";
import {UserService} from "../../service/user-service";
import {CategoryService} from "../../service/category-service";

declare var show_stack_topleft: any;
@Component({
  moduleId:module.id,
  selector:'goods-detail',
  templateUrl:'goods-detail.component.html'
})
export class GoodsDetailComponent implements OnInit{
  goods:Goods=new Goods();
  categories:Category[];
  goodsId:number;
  label:string;
  edit:boolean=false;
  constructor(private goodsService:GoodsService,private route:ActivatedRoute,private userService:UserService,private router:Router,
              private categoryService:CategoryService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
        if(params['goodsId']!=undefined&&params['goodsId'].trim()!='') {
          this.goodsId=params['goodsId'];
          this.label='商品详情';
          this.edit=true;
          this.goodsService.getGood(this.goodsId).then(res=> {
            this.goods=res;
          });
        }else {
          this.goods=new Goods();
          this.goods.inventory=0;
          this.label='添加商品';
        }
    });
    this.categoryService.getListForGood().then(res=> {
      this.categories=res;
    });
  }
  save() {
    if(this.edit) {
      this.goodsService.updateGood(this.goods)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/goods/list']);
          }
        });
    }else {
      this.goodsService.createGood(this.goods)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/goods/list']);
          }
        });
    }
  }
  delete() {
    this.goodsService.deleteGood(this.goodsId).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/goods/list']);
      }else {
        show_stack_topleft('error','删除用户失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
