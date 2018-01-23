/**
 * Created by ROGK on 2017/10/31.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SaleComponent} from "./sale.component";
import {SaleRoutingModule} from "./sale-routing.module";
import {SaleOrderDetailComponent} from "./sale-order-detail/sale-order-detail";
import {SaleOrderListComponent} from "./sale-order-list/sale-order-list";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {SaleStrategyList} from "./sale-strategy-list/sale-strategy-list";
import {SaleStrategyDetail} from "./sale-startegy-detail/sale-strategy-detail";
import { SaleDetailListComponent } from "./sale-detail-list/sale-detail-list.component";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    SaleRoutingModule,
    RouterModule,
    SharedModule
  ],
  declarations:[
    SaleComponent,
    SaleOrderDetailComponent,
    SaleOrderListComponent,
    SaleStrategyList,
    SaleStrategyDetail,
    SaleDetailListComponent
  ],
  exports:[SaleComponent]
})
export class SaleModule {
}
