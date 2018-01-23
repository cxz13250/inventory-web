/**
 * Created by ROGK on 2017/9/16.
 */
import {Component, Input, OnInit} from '@angular/core';
import {Menu} from "../../model/menu";
import {Router} from "@angular/router";
import {User} from "../../model/user";
@Component({
  moduleId: module.id,
  selector: 'left-side',
  templateUrl: 'left-side.component.html',
})
export class LeftSideComponent implements OnInit {

  @Input() user:User;
  menus:Menu[]=[];
  menuNames:string[]=[];
  constructor(private router:Router) {}
  ngOnInit() {
    this.menus=this.user.menus;
    this.menus.forEach(menu=> {
      if(this.menuNames.indexOf(menu.menu) < 0) {
        this.menuNames.push(menu.menu);
      }
    });
  }
  navigateToUrl(url:string){
    if(url.startsWith('http') || url.startsWith('www')) {
      window.location.href=url;
    }else {
      var urlList = url.split('?');
      if(urlList.length === 1) {
        this.router.navigate([url]);
      }
      if(urlList.length === 2){
        this.router.navigate([urlList[0]], {queryParams: this.parse_url(urlList[1])});
      }
    }
  }

  parse_url(url:any) {
    console.log(url);
    var pattern = /(\w+)=((-)*\w+)/ig;
    var parames:any = {};
    url.replace(pattern, function(a:any, b:any, c:any){
      parames[b] = c;
    });
    return parames;
  }
}
