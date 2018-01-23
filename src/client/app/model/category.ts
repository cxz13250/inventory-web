export class Category {
  id:number;
  name:string;
  superId:number;
  superName:string;
  description:string;
  createTime:number;
  canDelete:boolean;
  constructor(id?:number, name?:string, superId?:number, superName?:string, description?:string, createTime?:number, canDelete?:boolean) {
    this.id=id;
    this.name=name;
    this.superId=superId;
    this.superName=superName;
    this.description=description;
    this.createTime=createTime;
    this.canDelete=canDelete;
  }
}
