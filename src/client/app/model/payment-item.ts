export class PaymentItem {
  name:string;
  money:number;
  extra:string;
  constructor(name?:string, money?:number, extra?:string) {
    this.name=name;
    this.money=money;
    this.extra=extra;
  }
}
