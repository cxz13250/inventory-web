import {Injectable} from "@angular/core";

@Injectable()
export class ValidateService{
  constructor() {}
  validateEmail(email:string) {
    var emailRegExp = /^([\w\.\-]+)\@(\w+)(\.([\w^\_]+)){1,3}$/;
    return emailRegExp.test(email);
  }
  validateMobile(mobile:string) {
    var mobileRE = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/;
    return mobileRE.test(mobile);
  }
}
