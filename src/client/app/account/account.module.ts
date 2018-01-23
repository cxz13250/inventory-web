import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AccountRoutingModule} from "./account-routing.module";
import {AccountComponent} from "./account.component";
import {AccountDetailComponent} from "./account-detail/account-detail.component";
import {AccountListComponent} from "./account-list/account-list.component";
import {NgModule} from "@angular/core";

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    AccountRoutingModule,
    SharedModule
  ],
  declarations:[
    AccountComponent,
    AccountDetailComponent,
    AccountListComponent
  ],
  exports:[
    AccountComponent,
    AccountDetailComponent,
    AccountListComponent
  ]
})
export class AccountModule {
}
