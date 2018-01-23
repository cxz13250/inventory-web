import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {SharedModule} from "../shared/shared.module";

import {CategoryRoutingModule} from "./category-routing.module";
import {CategoryComponent} from "./category.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    CategoryRoutingModule,
    SharedModule
  ],
  declarations:[
    CategoryComponent,
    CategoryListComponent,
    CategoryDetailComponent
  ],
  exports:[
    CategoryComponent,
    CategoryListComponent,
    CategoryDetailComponent
  ]
})
export class CategoryModule {
}
