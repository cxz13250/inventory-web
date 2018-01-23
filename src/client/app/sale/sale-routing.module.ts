/**
 * Created by ROGK on 2017/10/31.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SaleComponent} from "./sale.component";
import {SaleOrderDetailComponent} from "./sale-order-detail/sale-order-detail";
import {SaleOrderListComponent} from "./sale-order-list/sale-order-list";
import {SaleStrategyDetail} from "./sale-startegy-detail/sale-strategy-detail";
import {SaleStrategyList} from "./sale-strategy-list/sale-strategy-list";
import { SaleDetailListComponent } from "./sale-detail-list/sale-detail-list.component";
@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'sale',component:SaleComponent,children:[
        { path: 'order/detail',component:SaleOrderDetailComponent},
        { path: 'order/list',component:SaleOrderListComponent},
        { path: 'strategy/detail',component:SaleStrategyDetail},
        { path: 'strategy/list',component:SaleStrategyList},
        { path: 'detail/list',component:SaleDetailListComponent},
      ]
    }])
  ]
})
export class SaleRoutingModule {
}
