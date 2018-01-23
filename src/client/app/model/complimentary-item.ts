export class ComplimentaryItem{
  goodName:string;
  sum:number;
  price:number;
  money:number;
  constructor(goodName?:string, sum?:number, price?:number, money?:number) {
    this.goodName=goodName;
    this.sum=sum;
    this.price=price;
    this.money=money;
  }
}
