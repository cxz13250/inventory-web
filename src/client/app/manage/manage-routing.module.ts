import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { ManageComponent } from "./manage.component";
import { ManageInfoComponent } from "./manage-info/manage-info.component";

@NgModule({
    imports:[
      RouterModule.forChild([{
        path: 'manage', component: ManageComponent,children:[
          {path: 'info', component: ManageInfoComponent },
        ]
      }])
    ]
  })
  export class ManageRoutingModule {
  
  }
  