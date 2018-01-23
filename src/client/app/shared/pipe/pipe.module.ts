import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {OrderStatusFilter} from "./order-status-filter";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    OrderStatusFilter,
  ],
  exports:[
    OrderStatusFilter,
  ]
})
export class PipeModule{
  constructor() {}
}
