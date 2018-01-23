import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ValidateService} from "../../service/validate-service";

declare var show_stack_topleft: any;
@Component({
  moduleId:module.id,
  selector:'user-detail',
  templateUrl:'user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user:User=new User();
  userId:number;
  label:string;
  roles:any[];
  edit:boolean=false;
  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router,private validateService:ValidateService) {}
  ngOnInit() {
    this.roles=[{id:1,name:'系统管理员'},{id:2,name:'库存管理人员'},{id:3,name:'进货销售人员'},{id:4,name:'财务人员'},{id:5,name:'总经理'}];
    this.route.queryParams.forEach((params:Params)=> {
      if(params['userId']&&params['userId'].trim()!='') {
        this.userId=params['userId'];
        this.label='用户详情';
        this.edit=true;
        this.userService.getUser(this.userId).then(res=> {
          this.user=res;
        });
      }else {
        this.label='添加用户';
        this.user.roleId=-1;
      }
    });
  }
  goBack() {
    this.userService.goBackUrl();
  }
  save() {
    if(!this.validateService.validateEmail(this.user.email)){
      show_stack_topleft('error','邮箱格式不正确');
      return;
    }
    if(!this.validateService.validateMobile(this.user.mobile)){
      show_stack_topleft('error','手机格式不正确');
      return;
    }
    if(this.edit) {
      this.userService.update(this.user)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/user/list']);
          }
        });
    }else {
      this.userService.register(this.user)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/user/list']);
          }
        });
    }
  }
  delete() {
    this.userService.delete(this.userId)
      .then(res=> {
        if(res.status == 200) {
          this.router.navigate(['/user/list']);
        }else {
          show_stack_topleft('error','删除用户失败');
        }
      });
  }
}
