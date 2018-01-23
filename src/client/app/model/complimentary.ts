import {ComplimentaryItem} from "./complimentary-item";

export class Complimentary{
  id:number;
  customId:number;
  customName:string;
  total:number;
  createTime:number;
  items:ComplimentaryItem[];
  status:number;
  extra:string;
  constructor(id?:number,customId?:number, customName?:string, total?:number, createTime?:number, items?:ComplimentaryItem[],status?:number, extra?:string) {
    this.id=id;
    this.customId=customId;
    this.customName=customName;
    this.total=total;
    this.createTime=createTime;
    this.items=items;
    this.status=status;
    this.extra=extra;
  }
}
