import {Goods} from "./goods";
import {GoodsItem} from "./goods-item";

export class Purchase {
  number:string;
  supplier:string;
  customId:number;
  repository:string;
  operator:string;
  extra:string;
  total:number;
  type:boolean;
  status:number;
  createTime:number;
  goodsItemVOS:GoodsItem[];
  constructor(number?:string, supplier?:string, customId?:number, repository?:string, operator?:string, extra?:string, total?:number, type?:boolean, status?:number,
  createTime?:number,goodsItemVOS?:GoodsItem[]) {
    this.number=number;
    this.supplier=supplier;
    this.repository=repository;
    this.operator=operator;
    this.extra=extra;
    this.total=total;
    this.type=type;
    this.status=status;
    this.createTime=createTime;
    this.goodsItemVOS=goodsItemVOS;
    this.customId=customId;
  }
}
