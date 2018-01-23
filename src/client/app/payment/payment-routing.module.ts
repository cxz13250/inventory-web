import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PaymentComponent} from "./payment.component";
import {PaymentListComponent} from "./payment-list/payment-list.component";
import {PaymentDetailComponent} from "./payment-detail/payment-detail.component";
@NgModule({
  imports:[
    RouterModule.forChild([{
      path:'payment',component:PaymentComponent,children:[
        {path: 'list', component: PaymentListComponent },
        {path: 'detail', component: PaymentDetailComponent},
      ]
    }])
  ]
})
export class PaymentRoutingModule {
}
