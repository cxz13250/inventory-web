import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoodsComponent } from './goods.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsDetailComponent } from './goods-detail/goods-detail.component';
import { GoodsRoutingModule } from './goods-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    GoodsRoutingModule,
    SharedModule
  ],
  declarations:[
    GoodsComponent,
    GoodsListComponent,
    GoodsDetailComponent
  ],
  exports:[
    GoodsComponent,
    GoodsListComponent,
    GoodsDetailComponent
  ]
})
export class GoodsModule {
}
