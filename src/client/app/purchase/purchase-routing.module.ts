import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {PurchaseComponent} from "./purchase.component";
import {PurchaseListComponent} from "./purchase-list/purchase-list.component";
import {PurchaseDetailComponent} from "./purchase-detail/purchase-detail.component";

@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'purchase', component: PurchaseComponent,children:[
        {path: 'list', component: PurchaseListComponent },
        {path: 'detail', component: PurchaseDetailComponent},
      ]
    }])
  ]
})
export class PurchaseRoutingModule {

}
