import { SaleOrderItem } from "./sale-order-item";

export class SaleOrder {
  number:string;
  customId:number;
  customName:string;
  salesman:string;
  operator:string;
  repository:string;
  total:number;
  discount:number;
  finalTotal:number;
  extra:string;
  type:boolean;
  status:number;
  createTime:number;
  orderItems:SaleOrderItem[];
  constructor(number?:string, salesman?:string, customId?:number, customName?:string, operator?:string, repository?:string, total?:number, discount?:number,
              extra?:string, type?:boolean, status?:number, createTime?:number ,orderItems?:SaleOrderItem[], finalTotal?:number) {
    this.number=number;
    this.customId=customId;
    this.customName=customName;
    this.salesman=salesman;
    this.operator=operator;
    this.repository=repository;
    this.total=total;
    this.discount=discount;
    this.extra=extra;
    this.type=type;
    this.status=status;
    this.createTime=createTime;
    this.orderItems=orderItems;
    this.finalTotal=finalTotal;
  }
}
