import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from "./category.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryDetailComponent } from "./category-detail/category-detail.component";

@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'category', component: CategoryComponent,children:[
        {path: 'list', component: CategoryListComponent },
        {path: 'detail', component: CategoryDetailComponent},
      ]
    }])
  ]
})
export class CategoryRoutingModule {

}
