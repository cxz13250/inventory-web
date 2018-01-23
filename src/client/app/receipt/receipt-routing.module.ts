import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReceiptComponent} from "./receipt.component";
import {ReceiptListComponent} from "./receipt-list/receipt-list.component";
import {ReceiptDetailComponent} from "./receipt-detail/receipt-detail.component";
@NgModule({
  imports:[
    RouterModule.forChild([{
      path:'receipt',component:ReceiptComponent,children:[
        {path: 'list', component: ReceiptListComponent },
        {path: 'detail', component: ReceiptDetailComponent},
      ]
    }])
  ]
})
export class ReceiptRoutingModule {
}
