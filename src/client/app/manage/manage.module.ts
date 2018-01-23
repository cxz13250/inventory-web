import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ManageComponent } from "./manage.component";
import { ManageInfoComponent } from "./manage-info/manage-info.component";
import { ManageRoutingModule } from "./manage-routing.module";

@NgModule({
    imports:[
      CommonModule,
      RouterModule,
      FormsModule,
      SharedModule,
      ManageRoutingModule
    ],
    declarations:[
      ManageComponent,
      ManageInfoComponent
    ],
    exports:[
      ManageComponent
    ]
  })
  export class ManageModule {
  }
  