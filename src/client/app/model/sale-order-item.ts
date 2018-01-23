export class SaleOrderItem {
  goodId:number;
  goodName:string;
  goodModel:string;
  sum:number;
  price:number;
  total:number;
  extra:string;
  constructor(goodId?:number,goodName?:string, goodModel?:string, sum?:number, price?:number, total?:number, extra?:string) {
    this.goodId=goodId;
    this.goodName=goodName;
    this.goodModel=goodModel;
    this.sum=sum;
    this.price=price;
    this.total=total;
    this.extra=extra;
  }
}
