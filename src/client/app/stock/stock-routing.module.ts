/**
 * Created by ROGK on 2017/10/31.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StockComponent} from "./stock.component";
import {StockListComponent} from "./stock-list/stock-list.component";
import {StockDetailComponent} from "./stock-detail/stock-detail.component";
import {ComplimentaryListComponent} from "./complimentary-list/complimentary-list";
import {ComplimentaryDetailComponent} from "./comlimentary-detail/complimentary-detail";
import {StockCheckComponent} from "./stock-check/stock-check.component";
@NgModule({
  imports:[
    RouterModule.forChild([{
      path:'stock',component:StockComponent,children:[
        {path: 'list', component: StockListComponent },
        {path: 'detail', component: StockDetailComponent},
        {path: 'complimentary/list', component: ComplimentaryListComponent},
        {path: 'complimentary/detail', component: ComplimentaryDetailComponent},
        {path: 'check', component: StockCheckComponent},
      ]
    }])
  ]
})
export class StockRoutingModule {
}
