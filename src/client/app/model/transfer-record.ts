export class TransferRecord {
  accountName:string;
  money:number;
  extra:string;
  constructor(accountName?:string,money?:number,extra?:string) {
    this.accountName=accountName;
    this.money=money;
    this.extra=extra;
  }
}
