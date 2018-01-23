export class GoodsItem {
  goodId:number;
  goodName:string;
  goodModel:string;
  number:number;
  price:number;
  sum:number;
  extra:string;
  constructor(goodId?:number, goodName?:string, goodModel?:string, number?:number, price?:number, sum?:number, extra?:string) {
    this.goodId=goodId;
    this.goodName=goodName;
    this.goodModel=goodModel;
    this.number=number;
    this.price=price;
    this.sum=sum;
    this.extra=extra;
  }
}
