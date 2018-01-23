import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {UserRoutingModule} from "./user-routing.module";
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {OperationListComponent} from "./operation-list/operation-list.component";

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations:[
    UserComponent,
    UserListComponent,
    UserDetailComponent,
    OperationListComponent,
  ],
  exports:[
    UserComponent,
    UserListComponent,
    UserDetailComponent
  ]
})
export class UserModule {
}
