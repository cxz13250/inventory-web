/**
 * Created by ROGK on 2017/9/15.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CommonRoutingModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  declarations:[
    CommonComponent,
    LoginComponent,
    MainPageComponent
  ],
  exports:[CommonComponent]
})
export class MCommonModule {
}
