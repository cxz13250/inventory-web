export class StockOrder {
  id:number;
  goodName:number;
  goodId:number;
  type:number;
  number:number;
  status:number;
  createTime:number;
  constructor(id?:number, goodName?:number, goodId?:number, type?:number, number?:number, status?:number, createTime?:number) {
    this.id=id;
    this.goodId=goodId;
    this.goodName=goodName;
    this.type=type;
    this.number=number;
    this.status=status;
    this.createTime=createTime;
  }
}
