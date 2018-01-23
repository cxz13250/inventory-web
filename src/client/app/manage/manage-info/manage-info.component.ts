import { Component } from "@angular/core";
import { OnInit, AfterViewChecked } from "@angular/core";
import { DateUtils } from "../../util/date-util";
import { ManageInfo } from "../../model/manage-info";
import { ManageService } from "../../service/manage-service";

declare var $ : any;
declare var moment: any;
@Component({
    moduleId:module.id,
    selector:'manage-info',
    templateUrl:'manage-info.component.html'
})
export class ManageInfoComponent implements OnInit,AfterViewChecked{
    manageInfo:ManageInfo=new ManageInfo();
    startTime:number;
    endTime:number;
    now: Date = new Date();
    show:boolean=false;
    file:string;
    constructor(private manageService:ManageService) {}

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
    search() {
        var examTime = $('#strategyTimePicker').val();
        if(examTime != null){
            var timeStrs = examTime.split(' - ');
            this.startTime = DateUtils.getTime(timeStrs[0]);
            this.endTime = DateUtils.getTime(timeStrs[1]);
        }
        this.manageService.getMangeInfo(this.startTime,this.endTime).then(res=> {
            if(res!=null) {
                this.manageInfo=res;
                this.show=!this.show;
                this.file=DateUtils.formatDate(this.startTime)+'_'+DateUtils.formatDate(this.endTime)+'经营情况表';
            }
        })
    }
}