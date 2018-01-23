import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {CustomRoutingModule} from "./custom-routing.module";
import {CustomComponent} from "./custom.component";
import {CustomListComponent} from "./custom-list/custom-list.component";
import {CustomDetailComponent} from "./custom-detail/custom-detail.component";

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    CustomRoutingModule,
    SharedModule
  ],
  declarations:[
    CustomComponent,
    CustomListComponent,
    CustomDetailComponent
  ],
  exports:[
    CustomComponent,
    CustomListComponent,
    CustomDetailComponent
  ]
})
export class CustomModule {
}
