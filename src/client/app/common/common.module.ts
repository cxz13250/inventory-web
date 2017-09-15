/**
 * Created by ROGK on 2017/9/15.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    CommonRoutingModule,
    FormsModule,
  ],
  declarations:[
    CommonComponent,
    LoginComponent
  ],
  exports:[CommonComponent]
})
export class MCommonModule {
}
