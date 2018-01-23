import {Component, OnInit} from '@angular/core';
import {Custom} from "../../model/custom";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../service/user-service";
import {CustomService} from "../../service/custom-service";
import {ValidateService} from "../../service/validate-service";
import { NumberUtil } from '../../util/number-util';

declare var show_stack_topleft: any;
@Component({
  moduleId:module.id,
  selector:'custom-detail',
  templateUrl:'custom-detail.component.html'
})
export class CustomDetailComponent implements OnInit {
  custom:Custom=new Custom();
  customId:number;
  edit:boolean=false;
  levels:any[];
  label:string;
  types:any[];
  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService,private customService:CustomService,
              private validateService:ValidateService) {}
  ngOnInit() {
    this.levels=[{id:1,name:'一级'},{id:2,name:'二级'},{id:3,name:'三级'},{id:4,name:'四级'},{id:5,name:'五级'}];
    this.types=[{id:1,name:'进货商'},{id:2,name:'销售商'}];
    this.route.queryParams.forEach((params:Params)=> {
      if(params['customId']!=undefined&&params['customId'].trim()!='') {
        this.customId=params['customId'];
        this.label='客户详情';
        this.edit=true;
        this.customService.get(this.customId).then(res=> {
          this.custom=res;
        });
      }else {
        this.custom.level=-1;
        this.custom.type=-1;
        this.custom.receive=0;
        this.custom.receiveLimit=0;
        this.custom.pay=0;
        this.label='添加客户';
      }
    });
  }
  save() {
    if(this.custom.level==-1){
      show_stack_topleft('error','请选择客户级别');
      return;
    }
    if(!this.validateService.validateEmail(this.custom.email)){
      show_stack_topleft('error','邮箱格式不正确');
      return;
    }
    if(!this.validateService.validateMobile(this.custom.mobile)){
      show_stack_topleft('error','手机格式不正确');
      return;
    }
    if(!NumberUtil.validateNumber(this.custom.pay) || !NumberUtil.validateNumber(this.custom.receiveLimit) || !NumberUtil.validateNumber(this.custom.receive)) {
      show_stack_topleft('error','输入金额过大');
      return;
    }
    if(this.edit) {
      this.customService.update(this.custom)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/custom/list']);
          }
        });
    }else {
      this.customService.create(this.custom)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/custom/list']);
          }
        });
    }
  }
  delete() {
    this.customService.delete(this.customId).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/custom/list']);
      }else {
        show_stack_topleft('error','删除客户失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
