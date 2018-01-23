export class SaleStrategy{
  id:number;
  name:string;
  content:string;
  startTime:number;
  endTime:number;
  constructor(id?:number, name?:string, content?:string, startTime?:number, endTime?:number) {
    this.id=id;
    this.name=name;
    this.content=content;
    this.startTime=startTime;
    this.endTime=endTime;
  }
}
