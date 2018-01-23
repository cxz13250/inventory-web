import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NameListService } from './name-list/name-list.service';
import { HeaderComponent } from './header/header.component';
import { LeftSideComponent } from './left-side/left-side.component';

import {PipeModule} from "./pipe/pipe.module";
import {NG2DataTableModule} from "./datatable/DataTableModule";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipeModule,
    NG2DataTableModule
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    HeaderComponent,
    LeftSideComponent,
  ],
  exports: [
    PipeModule,
    NG2DataTableModule,
    ToolbarComponent,
    NavbarComponent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    LeftSideComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService]
    };
  }
}
