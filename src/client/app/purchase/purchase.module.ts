import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {PurchaseRoutingModule} from "./purchase-routing.module";
import {PurchaseComponent} from "./purchase.component";
import {PurchaseListComponent} from "./purchase-list/purchase-list.component";
import {PurchaseDetailComponent} from "./purchase-detail/purchase-detail.component";

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    PurchaseRoutingModule,
    SharedModule
  ],
  declarations:[
    PurchaseComponent,
    PurchaseListComponent,
    PurchaseDetailComponent
  ],
  exports:[
    PurchaseComponent,
  ]
})
export class PurchaseModule {
}
