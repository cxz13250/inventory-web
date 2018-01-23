/**
 * Created by ROGK on 2017/9/15.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonComponent } from './common.component';
import { MainPageComponent } from './main-page/main-page.component';

import { LoginComponent } from './login/login.component';
@NgModule({
  imports:[
    RouterModule.forChild([{
      path: '', component: CommonComponent,children:[
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'main', component: MainPageComponent }
      ]
    }])
  ]
})
export class CommonRoutingModule {

}
