import {
    Directive, Input, EventEmitter, SimpleChange, OnChanges, DoCheck, IterableDiffers,
    IterableDiffer, Output
} from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';

export interface SortEvent {
    sortBy: string | string[];
    sortOrder: string
}

export interface PageEvent {
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
}

export interface DataEvent {
    length: number;
}

@Directive({
    selector: 'table[mfData]',
    exportAs: 'mfDataTable'
})
export class NG2DataTable implements OnChanges, DoCheck {

    private diff: IterableDiffer<any>;
    @Input("mfData") public inputData: any[] = [];

    @Input("mfSortBy") public sortBy: string = "";
    @Input("mfSortOrder") public sortOrder = "asc";
    @Output("mfSortByChange") public sortByChange = new EventEmitter<string | string[]>();
    @Output("mfSortOrderChange") public sortOrderChange = new EventEmitter<string>();
    @Output("mfOnPageChange") public onServerPageChange = new EventEmitter<PageEvent>();
    @Input("mfRowsOnPage") public rowsOnPage = 1000;
    @Input("mfActivePage") public activePage = 1;
    @Input("mfAmountOfRows") public amountOfRows = 0;
    @Input("mfIsServerPagination") public isServerPaginationage: boolean = false;

    private mustRecalculateData = false;

    public data: any[];

    public onSortChange = new ReplaySubject<SortEvent>(1);
    public onPageChange = new EventEmitter<PageEvent>();

    public constructor(private differs: IterableDiffers) {
        this.diff = differs.find([]).create(null);
    }

    public getSort(): SortEvent {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    }

    public setSort(sortBy: string, sortOrder: string): void {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = (sortOrder == "desc" || sortOrder == "asc") ? sortOrder : "asc";
            this.mustRecalculateData = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }

    public getPage(): PageEvent {
        return { activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length };
    }

    public setPage(activePage: number, rowsOnPage: number): void {
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            if (this.isServerPaginationage)
                this.onServerPageChange.emit({
                    activePage: this.activePage,
                    rowsOnPage: this.rowsOnPage,
                    dataLength: this.amountOfRows
                });
            else
                this.onPageChange.emit({
                    activePage: this.activePage,
                    rowsOnPage: this.rowsOnPage,
                    dataLength: this.inputData ? this.inputData.length : 0
                });
        }
    }

    private calculateNewActivePage(previousRowsOnPage: number, currentRowsOnPage: number): number {
        let firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
        return newActivePage;
    }

    private recalculatePage() {
        let lastPage = Math.ceil(this.amountOfRows / this.rowsOnPage);
        this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
        this.activePage = this.activePage || 1;

        if (this.isServerPaginationage) {
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.amountOfRows
            });
        }
        else {
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.inputData.length
            });
        }
    }

    public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
        if (changes["rowsOnPage"] && !this.isServerPaginationage) {
            this.rowsOnPage = changes["rowsOnPage"].previousValue;
            this.setPage(this.activePage, changes["rowsOnPage"].currentValue);
            this.mustRecalculateData = true;
        }

        if (changes["sortBy"] || changes["sortOrder"]) {
            if (!(this.sortOrder == "desc" || this.sortOrder == "asc")) {
                console.warn("angular2-serverpagination-datatable: value for input mfSortOrder must be one of ['asc', 'desc'], but is:", this.sortOrder);
                this.sortOrder = "asc";
            }
            if (this.sortBy) {
                this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
            }
            this.mustRecalculateData = true;
        }
        if (changes["inputData"]) {
            this.inputData = changes["inputData"].currentValue || [];
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
        if(changes["activePage"]) {
            this.setPage(changes["activePage"].currentValue, this.rowsOnPage);
            this.mustRecalculateData = true;
        }
    }

    public ngDoCheck(): any {
        let changes = this.diff.diff(this.inputData);
        if (changes) {
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
        if (this.mustRecalculateData) {
            this.fillData();
            this.mustRecalculateData = false;
        }
    }

    private fillData(): void {
        this.activePage = this.activePage;
        this.rowsOnPage = this.rowsOnPage;

        let offset = (this.activePage - 1) * this.rowsOnPage;
        let data = this.inputData;
        var sortBy = this.sortBy;
        if (!this.isServerPaginationage) {
            if (sortBy && sortBy.length != 0) {
                if (this.sortOrder == "asc") {
                    data = data.sort(this.compare(sortBy, true));
                } else {
                    data = data.sort(this.compare(sortBy, false));
                }
            }
            data = data.slice(offset, offset + this.rowsOnPage);
        }
        this.data = data;
    }

    private caseInsensitiveIteratee(sortBy: string) {
        return (row: any): any => {
            var value = row;
            for (let sortByProperty of sortBy.split('.')) {
                if (value) {
                    value = value[sortByProperty];
                }
            }
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    }

    compare(key: string, asc: boolean = true) {
        return (a:any, b:any) => {
            if (a[key] < b[key]) {
                return asc ? -1 : 1;
            } else if (a[key] > b[key]) {
                return asc ? 1 : -1;
            } else {
                return this.strCompare(JSON.stringify(a), JSON.stringify(b));
            }
        };
    }

    strCompare(str1: string, str2: string): number {
        if (str1 < str2) {
            return -1;
        } else if (str1 > str2) {
            return 1;
        } else {
            return 0;
        }
    }

}
