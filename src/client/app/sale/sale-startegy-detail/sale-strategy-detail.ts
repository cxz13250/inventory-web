import {AfterViewChecked, Component, OnInit} from "@angular/core";
import {SaleStrategy} from "../../model/sale-strategy";
import {StrategyService} from "../../service/strategy-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../service/user-service";
import {DateUtils} from "../../util/date-util";

declare var show_stack_topleft: any;
declare var $ : any;
declare var moment: any;
@Component({
  moduleId:module.id,
  selector:'strategy-detail',
  templateUrl:'sale-strategy-detail.html'
})
export class SaleStrategyDetail implements OnInit,AfterViewChecked{
  now: Date = new Date();
  strategy:SaleStrategy=new SaleStrategy();
  edit:boolean=false;
  label:string;
  id:number;
  constructor(private strategyService:StrategyService,private router:Router,private route:ActivatedRoute,
              private userService:UserService) {}
  ngOnInit() {
    this.route.queryParams.forEach((params:Params)=> {
      if(params['id']!=undefined&&params['id'].trim()!='') {
        this.id=params['id'];
        this.edit=true;
        this.label='策略详情';
        this.strategyService.get(this.id).then(res=> {
          this.strategy=res;
          $('#strategyTimePicker').daterangepicker({
            timePicker: true,
            timePickerIncrement: 1,
            timePicker24Hour: true,
            startDate: new Date(this.strategy.startTime),
            endDate: new Date(this.strategy.endTime),
            locale: {
              format: 'YYYY-MM-DD HH:mm'
            }
          });
        });
      }else {
        this.label='添加策略';
        this.strategy.startTime = this.now.getTime() + 600 * 1000;
        this.strategy.endTime = this.now.getTime() + 600 * 1000 + 7200 * 1000;
      }
    });
  }

  ngAfterViewChecked() {
    var $this = this;
    if ($('#strategyTimePicker').length !=0 && typeof($('#strategyTimePicker')[0].inited) == "undefined") {
      $('#strategyTimePicker')[0].inited = true
      $('#strategyTimePicker').daterangepicker({
        timePicker: true,
        timePickerIncrement: 1,
        timePicker24Hour: true,
        startDate: new Date($this.strategy.startTime),
        endDate: new Date($this.strategy.endTime),
        locale: {
          format: 'YYYY-MM-DD HH:mm'
        }
      });
    }
  }

  save() {
    var examTime = $('#strategyTimePicker').val();
    if(examTime != null){
      var timeStrs = examTime.split(' - ');
      this.strategy.startTime = DateUtils.getTime(timeStrs[0]);
      this.strategy.endTime = DateUtils.getTime(timeStrs[1]);
    }
    if(!this.strategy || this.strategy.content==''){
      show_stack_topleft('error','请输入策略内容');
      return;
    }
    if(this.edit) {
      this.strategyService.update(this.strategy)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/sale/strategy/list']);
          }
        });
    }else {
      this.strategyService.create(this.strategy)
        .then(res=> {
          if(res.status == 200) {
            this.router.navigate(['/sale/strategy/list']);
          }
        });
    }
  }
  delete() {
    this.strategyService.delete(this.id).then(res=> {
      if(res.status == 200) {
        this.router.navigate(['/sale/strategy/list']);
      }else {
        show_stack_topleft('error','删除失败');
      }
    }).catch(err=> {
      show_stack_topleft('error','删除出错');
    });
  }
  goBack() {
    this.userService.goBackUrl();
  }
}
