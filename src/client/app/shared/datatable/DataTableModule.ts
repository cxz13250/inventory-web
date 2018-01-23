import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {NG2DataTable} from "./DataTable";
import {NG2DefaultSorter} from "./DefaultSorter";
import {NG2Paginator} from "./Paginator";
import {NG2BootstrapPaginator} from "./BootstrapPaginator";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NG2DataTable,
        NG2DefaultSorter,
        NG2Paginator,
        NG2BootstrapPaginator
    ],
    exports: [
        NG2DataTable,
        NG2DefaultSorter,
        NG2Paginator,
        NG2BootstrapPaginator
    ]
})
export class NG2DataTableModule {

}