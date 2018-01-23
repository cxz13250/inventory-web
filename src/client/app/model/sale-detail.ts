export class SaleDetail {
    goodName:string;
    goodModel:string;
    goodNum:number;
    price:number;
    total:number;
    createTime:number;
    constructor(goodName?:string,goodModel?:string,goodNum?:number,price?:number,total?:number,createTime?:number) {
        this.goodModel=goodModel;
        this.goodName=goodName;
        this.goodNum=goodNum;
        this.price=price;
        this.total=total;
        this.createTime=createTime;
    }
}