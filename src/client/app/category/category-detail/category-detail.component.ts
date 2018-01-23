import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../service/category-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../service/user-service";
import {Category} from "../../model/category";

declare var show_stack_topleft: any;
@Component({
  moduleId:module.id,
  selector:'category-detail',
  templateUrl:'category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
  category:Category=new Category();
  categories:Category[];
  categoryId:number;
  edit:boolean;
  label:string;
  constructor(private router:Router,private route:ActivatedRoute,private categoryService:CategoryService,private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['categoryId']!=undefined&&params['categoryId'].trim()!='') {
        this.categoryId=params['categoryId'];
        this.label='类别详情';
        this.edit=true;
        this.categoryService.get(this.categoryId).then(res=> {
          this.category=res;
        });
      }else {
        this.label='添加类别';
        this.category.superId=-1;
      }
    });
    this.categoryService.getListForCategory().then(res=> {
      this.categories=res;
    });
  }
  save() {
    if(this.edit) {
      this.categoryService.update(this.category)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/category/list']);
          }
        });
    }else {
      this.categoryService.create(this.category)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/category/list']);
          }
        });
    }
  }
  delete() {
    this.categoryService.delete(this.categoryId).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/category/list']);
      }else {
        show_stack_topleft('error','删除类别失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
