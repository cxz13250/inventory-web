import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoodsComponent } from './goods.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsDetailComponent } from './goods-detail/goods-detail.component';

@NgModule({
  imports:[
    RouterModule.forChild([{
      path: 'goods', component: GoodsComponent,children:[
        {path: 'list', component: GoodsListComponent },
        {path: 'detail', component: GoodsDetailComponent},
      ]
    }])
  ]
})
export class GoodsRoutingModule {

}
