/**
 * Created by ROGK on 2017/9/15.
 */
import { Menu } from './menu';

export class User {
  id:number;
  name:string;
  email:string;
  mobile:string;
  password:string;
  createTime:number;
  roleName:string;
  roleId:number;
  menus:Menu[];

  constructor(id?:number,name?:string,email?:string,mobile?:string,password?:string,createTime?:number,menus?:Menu[],roleId?:number,roleName?:string) {
    this.id=id;
    this.name=name;
    this.email=email;
    this.mobile=mobile;
    this.password=password;
    this.createTime=createTime;
    this.menus=menus;
    this.roleId=roleId;
    this.roleName=roleName;
  }

  public static transfer(rawUser:User):User {
    return new User(rawUser.id,rawUser.name,rawUser.email,rawUser.mobile,rawUser.password,rawUser.createTime,rawUser.menus,rawUser.roleId,
      rawUser.roleName);
  }
}
