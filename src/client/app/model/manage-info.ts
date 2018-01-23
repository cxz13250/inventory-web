export class ManageInfo{
    saleIncome:number;
    saleDiscount:number;
    goodsIncome:number;
    goodsDiscount:number;
    saleCost:number;
    goodsCost:number;
    profit:number;
    constructor(saleIncome?:number,saleDiscount?:number,goodsIncome?:number,goodsDiscount?:number,saleCost?:number,goodsCost?:number,
        profit?:number) {
        this.saleIncome=saleIncome;
        this.saleDiscount=saleDiscount;
        this.goodsIncome=goodsIncome;
        this.goodsDiscount=goodsDiscount;
        this.goodsCost=goodsCost;
        this.saleCost=saleCost;
        this.profit=profit;
    }
}