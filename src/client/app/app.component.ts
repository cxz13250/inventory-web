import {Component, OnInit} from '@angular/core';
import './operators';
import {NavigationStart, Router, RoutesRecognized} from "@angular/router";
import {UserService} from "./service/user-service";
import {User} from "./model/user";
import {URL_AWAILABLE} from "./const/url-const";

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit{
  hostUrl: string = '/main';
  constructor(private router:Router,private userService:UserService) {
  }
  ngOnInit() {
    this.router.events.filter(event => event instanceof RoutesRecognized).subscribe((val:NavigationStart) => {
      if( this.ifUrlNeedCheck(val.url)) {
        if(this.userService.getCurrentUser() === null){
          this.router.navigate(['/login']);
        }
      }
      var urlList: string[] = val.url.split('?');
      var user: User = this.userService.getCurrentUser();
      if(this.ifUrlNeedCheck(val.url) && user) {
        if(!this.testIfUrlAuth(urlList[0], user)) {
          this.router.navigate([this.hostUrl]);
        }
      }
    });
  }
  testIfUrlAuth(url: string, user: User): boolean {
    var result: boolean = false;
    var urls: string[] = [];
    urls.push(this.hostUrl);
    var roleId=user.roleId;
    if(roleId == 1 ) {
      URL_AWAILABLE.ADMIN.forEach((urlAuth) => {
        urls.push(urlAuth);
      });
    }else if(roleId == 2){
      URL_AWAILABLE.STOCK.forEach((urlAuth) => {
        urls.push(urlAuth);
      });
    }else if(roleId == 3){
      URL_AWAILABLE.SALES.forEach((urlAuth) => {
        urls.push(urlAuth);
      });
    }else if(roleId == 4){
      URL_AWAILABLE.FINANCIAL.forEach((urlAuth) => {
        urls.push(urlAuth);
      });
    }else if(roleId == 5){
      URL_AWAILABLE.MANAGER.forEach((urlAuth) => {
        urls.push(urlAuth);
      });
    }
    urls.forEach( (urlAuth) => {
      if(url.startsWith(urlAuth))
        result = true;
    });
    return result;
  }
  ifUrlNeedCheck(url:string):boolean {
    return !url.startsWith('/login');
  }
}
