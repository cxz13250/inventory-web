import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { DetailService } from "../../service/detail-service";
import { SaleDetail } from "../../model/sale-detail";
import { DateUtils } from "../../util/date-util";

declare var $ : any;
declare var moment: any;
@Component({
    moduleId:module.id,
    selector:'sale-detail-list',
    templateUrl:'sale-detail-list.component.html'
})
export class SaleDetailListComponent implements OnInit,AfterViewChecked {
    details:SaleDetail[]=[];
    now: Date = new Date();
    rowsOnPage:number=10;
    activePage:number=1;
    sortOrder:string='desc';
    sortBy:string='createTime';
    startTime:number;
    endTime:number;
    itemsTotal:number=0;
    show:boolean=false;
    file:string;
    constructor(private detailService:DetailService) {}
    ngOnInit() {
        this.startTime = this.now.getTime() + 600 * 1000;
        this.endTime = this.now.getTime() + 600 * 1000 + 7200 * 1000;
    }
    ngAfterViewChecked() {
        var $this = this;
        if ($('#strategyTimePicker').length !=0 && typeof($('#strategyTimePicker')[0].inited) == "undefined") {
          $('#strategyTimePicker')[0].inited = true
          $('#strategyTimePicker').daterangepicker({
            timePicker: true,
            timePickerIncrement: 1,
            timePicker24Hour: true,
            startDate: new Date($this.startTime),
            endDate: new Date($this.endTime),
            locale: {
              format: 'YYYY-MM-DD HH:mm'
            }
          });
        }
    }
    loadData() {
        var examTime = $('#strategyTimePicker').val();
        if(examTime != null){
            var timeStrs = examTime.split(' - ');
            this.startTime = DateUtils.getTime(timeStrs[0]);
            this.endTime = DateUtils.getTime(timeStrs[1]);
        }
        this.detailService.getSaleDetail(this.startTime,this.endTime,this.activePage,this.rowsOnPage,this.sortBy)
            .then(res=> {
                this.details=res.content as SaleDetail[];
                this.itemsTotal=res.totalElements;
                this.show=!this.show;
                this.file=DateUtils.formatDate(this.startTime)+'_'+DateUtils.formatDate(this.endTime)+'销售明细表';
            });
    }
    onPageChange(event:any) {
        this.rowsOnPage = event.rowsOnPage;
        this.activePage = event.activePage;
        this.loadData();
    }
    onSortOrder(event:any) {
        this.loadData();
    }
    search() {
        this.loadData();
    }
}