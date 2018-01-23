import {Component, OnInit} from '@angular/core';
import {Receipt} from "../../model/receipt";
import {ReceiptService} from "../../service/receipt-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Account} from "../../model/account";
import {TransferRecord} from "../../model/transfer-record";
import {Custom} from "../../model/custom";
import {UserService} from "../../service/user-service";
import {AccountService} from "../../service/account-service";
import {CustomService} from "../../service/custom-service";
import {ORDER_CONST} from "../../const/order-status";

declare var show_stack_topleft: any;
declare var $ : any;
@Component({
  moduleId:module.id,
  selector:'receipt-detail',
  templateUrl:'receipt-detail.component.html'
})
export class ReceiptDetailComponent implements OnInit{
  receipt:Receipt=new Receipt();
  transfers:TransferRecord[];
  transfer:TransferRecord=new TransferRecord();
  number:string;
  accounts:Account[]=[];
  customs:Custom[]=[];
  label:string;
  edit:boolean=false;
  constructor(private receiptService:ReceiptService,private router:Router,private route:ActivatedRoute,private userService:UserService,
              private accountService:AccountService,private customService:CustomService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['number']!=undefined&&params['number']!=null&&params['number'].trim()!='') {
        this.number=params['number'];
        this.label='收款单详情';
        this.receiptService.get(this.number).then(res=> {
          this.receipt=res;
          if(this.receipt.status == ORDER_CONST.DRAFT && (this.userService.getCurrentUser().roleId ==1 || this.userService.getCurrentUser().roleId ==4)){
            this.edit=true;
          }
          this.transfers=this.receipt.transfers;
        });
      }else {
        this.edit=true;
        this.receipt.status=ORDER_CONST.DRAFT;
        this.receipt.customId=-1;
        this.receipt.total=0;
        this.transfers=[];
        this.label='添加收款单';
      }
    });
    this.accountService.getListForReceipt()
      .then(res=> {
      this.accounts=res;
    });
    this.customService.getListForReceipt()
      .then(res=> {
        this.customs=res;
      });
  }
  save() {
    if(this.receipt.customId==-1){
      show_stack_topleft('error','请选择转账客户');
      return;
    }
    if(this.receipt.number) {
      this.receipt.transfers=this.transfers;
      this.receiptService.update(this.receipt)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/receipt/list']);
          }
        });
    }else {
      this.receipt.operator=this.userService.getCurrentUser().name;
      this.receipt.transfers=this.transfers;
      this.receiptService.create(this.receipt)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/receipt/list']);
          }
        });
    }
  }
  submit(){
    this.receipt.status=ORDER_CONST.CHECKING;
    this.save();
  }
  delete() {
    this.receiptService.delete(this.number).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/receipt/list']);
      }else {
        show_stack_topleft('error','删除收款单失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  createItem() {
    this.transfer=new TransferRecord();
    this.transfer.accountName='-1';
    $('#receipt').modal('show');
  }
  goBack() {
    this.userService.goBackUrl();
  }
  send() {
    if(this.transfer.accountName=='-1') {
      show_stack_topleft('error','请选择账户');
      return;
    }
    this.transfers.push(this.transfer);
    this.computeTotal();
  }
  cancel() {
    $('#receipt').modal('hide');
  }
  deleteItem(i:number) {
    this.transfers.splice(i,1);
    this.computeTotal();
  }
  computeTotal() {
    this.receipt.total=0;
    this.transfers.forEach((item:TransferRecord)=> {
      this.receipt.total=this.receipt.total+item.money;
    });
  }
}
