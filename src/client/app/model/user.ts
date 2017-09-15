/**
 * Created by ROGK on 2017/9/15.
 */
export class User {
  id:number;
  name:string;
  email:string;
  mobile:string;
  password:string;
  createTime:number;

  constructor(id:number,name:string,email:string,mobile:string,password:string,createTime:number) {
    this.id=id;
    this.name=name;
    this.email=email;
    this.mobile=mobile;
    this.password=password;
    this.createTime=createTime;
  }
}
