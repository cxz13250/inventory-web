import {TransferRecord} from "./transfer-record";

export class Receipt {
  number:string;
  customId:number;
  customName:string;
  operator:string;
  total:number;
  status:number;
  createTime:number;
  transfers:TransferRecord[];
  constructor(number?:string, customId?:number, customName?:string, operator?:string, total?:number, status?:number, createTime?:number, transfers?:TransferRecord[]) {
    this.number=number;
    this.createTime=createTime;
    this.customId=customId;
    this.customName=customName;
    this.status=status;
    this.total=total;
    this.operator=operator;
    this.transfers=transfers;
  }
}
