/**
 * Created by ROGK on 2017/10/31.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StockComponent} from "./stock.component";
import {StockRoutingModule} from "./stock-routing.module";
import {RouterModule} from "@angular/router";
import {StockListComponent} from "./stock-list/stock-list.component";
import {StockDetailComponent} from "./stock-detail/stock-detail.component";
import {ComplimentaryListComponent} from "./complimentary-list/complimentary-list";
import {SharedModule} from "../shared/shared.module";
import {ComplimentaryDetailComponent} from "./comlimentary-detail/complimentary-detail";
import {StockCheckComponent} from "./stock-check/stock-check.component";
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    StockRoutingModule,
    RouterModule,
    SharedModule
  ],
  declarations:[
    StockComponent,
    StockListComponent,
    StockDetailComponent,
    StockCheckComponent,
    ComplimentaryListComponent,
    ComplimentaryDetailComponent
  ],
  exports:[StockComponent]
})
export class StockModule {
}
