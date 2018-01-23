/**
 * Created by ROGK on 2017/9/16.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../service/user-service";
import {User} from "../../model/user";
@Component({
  moduleId:module.id,
  selector:'header-app',
  templateUrl:'header.component.html'
})
export class HeaderComponent implements OnInit {
  user:User=new User();
  constructor(private router:Router,private userService:UserService) {}
  ngOnInit() {
    this.user=this.userService.getCurrentUser();
  }
  signOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
