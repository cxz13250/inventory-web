import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user-service";

@Component({
  moduleId:module.id,
  selector:'user-list',
  templateUrl:'user-list.component.html'
})
export class UserListComponent implements OnInit {
  users:User[];
  constructor(private userService:UserService) {}
  ngOnInit() {
    this.userService.getList().then(res=> {
      this.users=res;
    });
  }
  search() {
    this.userService.getList().then(res=> {
      this.users=res;
    });
  }
}
