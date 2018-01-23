import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AccountComponent} from "./account.component";
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountDetailComponent} from "./account-detail/account-detail.component";

@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'account', component: AccountComponent,children:[
        {path: 'list', component: AccountListComponent },
        {path: 'detail', component: AccountDetailComponent},
      ]
    }])
  ]
})
export class AccountRoutingModule {

}
