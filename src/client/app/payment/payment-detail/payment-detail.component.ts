import {Component, OnInit} from '@angular/core';
import {Payment} from "../../model/payment";
import {PaymentService} from "../../service/payment-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../service/user-service";
import {Account} from "../../model/account";
import {PaymentItem} from "../../model/payment-item";
import {ORDER_CONST} from "../../const/order-status";
import {AccountService} from "../../service/account-service";
import {Custom} from "../../model/custom";
import {CustomService} from "../../service/custom-service";

declare var show_stack_topleft: any;
declare var $ : any;
@Component({
  moduleId:module.id,
  selector:'payment-detail',
  templateUrl:'payment-detail.component.html'
})
export class PaymentDetailComponent implements OnInit{
  label:string;
  number:string;
  payment:Payment=new Payment();
  accounts:Account[]=[];
  customs:Custom[]=[];
  paymentItems:PaymentItem[]=[];
  paymentItem:PaymentItem=new PaymentItem();
  edit:boolean=false;
  constructor(private paymentService:PaymentService,private router:Router,private route:ActivatedRoute,private userService:UserService,
              private accountService:AccountService,private customService:CustomService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['number']!=undefined&&params['number'].trim()!='') {
        this.number=params['number'];
        this.label='付款单详情';
        this.paymentService.get(this.number).then(res=> {
          this.payment=res;
          if(this.payment.status == ORDER_CONST.DRAFT && (this.userService.getCurrentUser().roleId ==1 || this.userService.getCurrentUser().roleId ==4)){
            this.edit=true;
          }
          this.paymentItems=this.payment.entries;
        });
      }else {
        this.payment=new Payment();
        this.payment.status=ORDER_CONST.DRAFT;
        this.payment.total=0;
        this.edit=true;
        this.paymentItems=[];
        this.label='添加付款单';
      }
    });
    this.accountService.getListForReceipt().then(res=> {
      this.accounts=res;
    });
    this.customService.getListForReceipt().then(res=> {
      this.customs=res;
    });
  }
  save() {
    if(!this.payment.accountId){
      show_stack_topleft('error','请选择银行账户');
      return;
    }
    if(this.payment.number) {
      this.payment.entries=this.paymentItems;
      this.paymentService.update(this.payment)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/payment/list']);
          }
        });
    }else {
      this.payment.operator=this.userService.getCurrentUser().name;
      this.payment.entries=this.paymentItems;
      this.paymentService.create(this.payment)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/payment/list']);
          }
        });
    }
  }
  submit(){
    this.payment.status=ORDER_CONST.CHECKING;
    this.save();
  }
  delete() {
    this.paymentService.delete(this.number).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/payment/list']);
      }else {
        show_stack_topleft('error','删除付款单失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  createItem() {
    this.paymentItem=new PaymentItem();
    $('#payment').modal('show');
  }
  goBack() {
    this.userService.goBackUrl();
  }
  send() {
    this.paymentItems.push(this.paymentItem);
    this.computeTotal();
  }
  cancel() {
    $('#payment').modal('hide');
  }
  deleteItem(i:number) {
    this.paymentItems.splice(i,1);
    this.computeTotal();
  }
  computeTotal() {
    this.payment.total=0;
    this.paymentItems.forEach((item:PaymentItem)=> {
      this.payment.total=this.payment.total+item.money;
    });
  }
}
