import {Pipe, PipeTransform} from "@angular/core";
import {ORDER_CONST} from "../../const/order-status";

@Pipe({
  name:'orderStatus'
})
export class OrderStatusFilter implements PipeTransform{
  transform(value:number):string{
    if (value === ORDER_CONST.DRAFT) {
      return '草稿';
    } else if (value === ORDER_CONST.CHECKING) {
      return '审核中';
    } else if (value === ORDER_CONST.APPROVED) {
      return '已通过';
    } else if (value === ORDER_CONST.REJECTED) {
      return '未通过';
    } else {
      return '已删除';
    }
  }
}
