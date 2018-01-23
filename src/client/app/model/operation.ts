export class Operation {
  name:string;
  operation:string;
  ip:string;
  createTime:number;
  constructor(name:string, operation:string, ip:string, createTime:number) {
    this.name=name;
    this.operation=operation;
    this.ip=ip;
    this.createTime=createTime;
  }
}
