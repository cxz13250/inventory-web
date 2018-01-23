import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ReceiptComponent} from "./receipt.component";
import {ReceiptDetailComponent} from "./receipt-detail/receipt-detail.component";
import {ReceiptListComponent} from "./receipt-list/receipt-list.component";
import {ReceiptRoutingModule} from "./receipt-routing.module";
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReceiptRoutingModule
  ],
  declarations:[
    ReceiptComponent,
    ReceiptDetailComponent,
    ReceiptListComponent
  ],
  exports:[ReceiptComponent]
})
export class ReceiptModule {
}
