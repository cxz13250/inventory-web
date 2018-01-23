import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UserComponent} from "./user.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {OperationListComponent} from "./operation-list/operation-list.component";

@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'user', component: UserComponent,children:[
        {path: 'list', component: UserListComponent },
        {path: 'detail', component: UserDetailComponent},
        {path: 'operation', component: OperationListComponent},
      ]
    }])
  ]
})
export class UserRoutingModule {

}
