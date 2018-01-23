/**
 * Created by ROGK on 2017/9/15.
 */
import { Component } from '@angular/core';
import { UserService } from '../../service/user-service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

declare var show_stack_topleft: any;

@Component({
  moduleId: module.id,
  selector: 'login-app',
  templateUrl: 'login.component.html',
  styleUrls:['login.component.css']
})
export class LoginComponent {

  user:User=new User();
  image:string='url("/assets/img/login_bg.jpg")';
  constructor(private userService:UserService,private router:Router) {
    this.user=new User();
  }
  login() {
    if(!this.user.email || this.user.email=='') {
      show_stack_topleft('error','请输入用户名');
    }
    if(!this.user.password || this.user.password=='') {
      show_stack_topleft('error','请输入密码');
    }
    this.userService.login(this.user).subscribe((res:any)=> {
      var data=res.json();
      if(data.status == 2002) {
        show_stack_topleft('error','用户不存在');
        return;
      }if(data.status == 2015) {
        show_stack_topleft('error','密码错误');
        return;
      }else if(data.status == 200) {
        var user=User.transfer(data.data as User);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/main']);
      }
    },(error:Error)=> {
      show_stack_topleft('error','哎呀,出错了');
    });
    // if(this.user.email==='admin'&&this.user.password==='admin') {
    //   this.router.navigate(['/main']);
    // }else {
    //   show_stack_topleft('error','用户名密码错误');
    // }
  }
}
