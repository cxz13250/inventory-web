import {type} from "os";

export class Custom {
  id:number;
  type:number;
  level:number;
  name:string;
  mobile:string;
  address:string;
  postCode:string;
  email:string;
  receiveLimit:number;
  receive:number;
  pay:number;
  salesman:string;
  constructor(id?:number, type?:number, level?:number, name?:string, mobile?:string, address?:string, postCode?:string, email?:string,
              receiveLimit?:number, receive?:number, pay?:number, salesman?:string) {
    this.id=id;
    this.type=type;
    this.level=level;
    this.name=name;
    this.mobile=mobile;
    this.address=address;
    this.postCode=postCode;
    this.email=email;
    this.receive=receive;
    this.receiveLimit=receiveLimit;
    this.pay=pay;
    this.salesman=salesman;
  }

  public static transfer(rawCustom:Custom):Custom{
    return new Custom(rawCustom.id,rawCustom.type,rawCustom.level,rawCustom.name,rawCustom.mobile,rawCustom.address,rawCustom.postCode,
      rawCustom.email,rawCustom.receiveLimit,rawCustom.receive,rawCustom.pay,rawCustom.salesman);
  }

  getType():string {
    if(this.type==1)
      return '进货商';
    else
      return '销售商';
  }

  getLevel():string {
    if(this.level==1) {
      return '一级';
    }else if(this.level==2){
      return '二级';
    }else if(this.level==3){
      return '三级';
    }else if(this.level==4){
      return '四级';
    }else if(this.level==5){
      return '五级';
    }else {
      return '';
    }
  }
}
