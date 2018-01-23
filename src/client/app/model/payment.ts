import {PaymentItem} from "./payment-item";

export class Payment {
  number:string;
  operator:string;
  account:string;
  accountId:number;
  customId:number;
  total:number=0;
  status:number;
  createTime:number;
  entries:PaymentItem[];
  constructor(number?:string, operator?:string, accountId?:number, account?:string, customId?:number,total?:number, status?:number,
              createTime?:number, entries?:PaymentItem[]) {
    this.number=number;
    this.operator=operator;
    this.account=account;
    this.accountId = accountId;
    this.total=total;
    this.status=status;
    this.createTime=createTime;
    this.entries=entries;
    this.customId=customId;
  }
}
