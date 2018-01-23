import {Component, OnInit} from '@angular/core';
import {Account} from "../../model/account";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../service/account-service";
import {UserService} from "../../service/user-service";
import { NumberUtil } from '../../util/number-util';


declare var show_stack_topleft: any;
@Component({
  moduleId:module.id,
  selector:'account-detail',
  templateUrl:'account-detail.component.html'
})
export class AccountDetailComponent implements OnInit {
  account:Account=new Account();
  accountId:number;
  label:string;
  edit:boolean=false;
  constructor(private router:Router,private route:ActivatedRoute,private accountService:AccountService,private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['accountId']!=undefined&&params['accountId'].trim()!='') {
        this.accountId=params['accountId'];
        this.label='账户详情';
        this.edit=true;
        this.accountService.get(this.accountId).then(res=> {
          this.account=res;
        });
      }else {
        this.account=new Account();
        this.label='添加账户';
      }
    });
  }
  save() {
    if(!this.account.name || this.account.name.trim()==''){
      show_stack_topleft('error','请输入账户名');
      return;
    }
    if(!this.account.bank || this.account.bank.trim()=='') {
      show_stack_topleft('error','请输入银行');
      return;
    }
    if(!this.account.bankNum || this.account.bankNum.trim()=='') {
      show_stack_topleft('error','请输入银行卡号');
      return;
    }
    if(!NumberUtil.validateNumber(this.account.balance)){
      show_stack_topleft('error','金额过大');
      return;
    }
    if(this.edit) {
      this.accountService.update(this.account)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/account/list']);
          }
        });
    }else {
      this.accountService.create(this.account)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/account/list']);
          }
        });
    }
  }
  delete() {
    this.accountService.delete(this.accountId).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/account/list']);
      }else {
        show_stack_topleft('error','删除帐户失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  getBank() {
    this.accountService.getBank(this.account.bankNum)
      .then(res=> {
        if(res.status != 200){
          show_stack_topleft('error','请输入正确的银行卡号');
          return;
        }else{
          var bank=res.data;
          this.accountService.getBanks().then(res=> {
            for(var item in res)  
            {  
              if(item==bank) {
                console.log(item);
                this.account.bank=res[item];
              }
            }  
          });
        }
      })
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
