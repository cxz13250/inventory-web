/**
 * Created by ROGK on 2017/9/15.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonComponent } from './common.component';

import { LoginComponent } from './login/login.component';
@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'common', component: CommonComponent,children:[
        {path: 'login', component: LoginComponent }
      ]
    }])
  ]
})
export class CommonRoutingModule {

}
