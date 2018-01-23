export class Account {
  id:number;
  name:string;
  balance:number;
  bank:string;
  bankNum:string;
  createTime:number;
  constructor(id?:number, name?:string, balance?:number, bank?:string, createTime?:number) {
    this.id=id;
    this.name=name;
    this.balance=balance;
    this.bank=bank;
    this.createTime=createTime;
  }
}
