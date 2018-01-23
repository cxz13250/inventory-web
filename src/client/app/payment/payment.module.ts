import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {PaymentComponent} from "./payment.component";
import {PaymentListComponent} from "./payment-list/payment-list.component";
import {PaymentDetailComponent} from "./payment-detail/payment-detail.component";
import {PaymentRoutingModule} from "./payment-routing.module";
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    PaymentRoutingModule
  ],
  declarations:[
    PaymentComponent,
    PaymentListComponent,
    PaymentDetailComponent
  ],
  exports:[PaymentComponent]
})
export class PaymentModule {
}
