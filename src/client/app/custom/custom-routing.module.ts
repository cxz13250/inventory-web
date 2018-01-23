import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CustomComponent} from "./custom.component";
import {CustomListComponent} from "./custom-list/custom-list.component";
import {CustomDetailComponent} from "./custom-detail/custom-detail.component";

@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'custom', component: CustomComponent,children:[
        {path: 'list', component: CustomListComponent },
        {path: 'detail', component: CustomDetailComponent},
      ]
    }])
  ]
})
export class CustomRoutingModule {

}
