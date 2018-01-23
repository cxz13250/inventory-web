import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MCommonModule } from './common/common.module';
import { SaleModule } from './sale/sale.module';
import { StockModule } from './stock/stock.module';
import { UserService } from './service/user-service';
import { GoodsModule } from './goods/goods.module';
import {CategoryModule} from "./category/category.module";
import {AccountModule} from "./account/account.module";
import {CustomModule} from "./custom/custom.module";
import {PurchaseModule} from "./purchase/purchase.module";
import {GoodsService} from "./service/goods-service";
import {CategoryService} from "./service/category-service";
import {AccountService} from "./service/account-service";
import {CustomService} from "./service/custom-service";
import {ReceiptService} from "./service/receipt-service";
import {PurchaseService} from "./service/purchase-service";
import {PaymentService} from "./service/payment-service";
import {SaleService} from "./service/sale-service";
import {StockService} from "./service/stock-service";
import {StrategyService} from "./service/strategy-service";
import {UserModule} from "./user/user.module";
import {PaymentModule} from "./payment/payment.module";
import {ReceiptModule} from "./receipt/receipt.module";
import {ComplimentaryService} from "./service/complimentary-service";
import {ValidateService} from "./service/validate-service";
import { ManageModule } from './manage/manage.module';
import { ManageService } from './service/manage-service';
import { DetailService } from './service/detail-service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    MCommonModule,
    SaleModule,
    StockModule,
    SharedModule,
    GoodsModule,
    CategoryModule,
    AccountModule,
    CustomModule,
    PurchaseModule,
    UserModule,
    PaymentModule,
    ReceiptModule,
    ManageModule
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>',
  },
    UserService,
    GoodsService,
    CategoryService,
    AccountService,
    CustomService,
    ReceiptService,
    PurchaseService,
    PaymentService,
    SaleService,
    StockService,
    StrategyService,
    ComplimentaryService,
    ValidateService,
    ManageService,
    DetailService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
