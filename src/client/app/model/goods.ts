export class Goods {
  id:number;
  name:string;
  model:string;
  categoryId:number;
  categoryName:string;
  inventory:number=0;
  costPrice:number;
  retailPrice:number;
  currentCostPrice:number;
  currentRetailPrice:number;
  warning:boolean;

  constructor(id?:number, name?:string, model?:string, categoryId?:number,categoryName?:string, inventory?:number, costPrice?:number, retailPrice?:number,
  currentCostPrice?:number, currentRetailPrice?:number, warning?:boolean) {
    this.id=id;
    this.name=name;
    this.model=model;
    this.categoryId=categoryId;
    this.categoryName=categoryName;
    this.model=model;
    this.inventory=inventory;
    this.costPrice=costPrice;
    this.retailPrice=retailPrice;
    this.currentCostPrice=currentCostPrice;
    this.currentRetailPrice=currentRetailPrice;
    this.warning=warning;
  }

  public static transfer(rawGoods:Goods):Goods {
    return new Goods(rawGoods.id,rawGoods.name,rawGoods.model,rawGoods.categoryId,rawGoods.categoryName,rawGoods.inventory,rawGoods.costPrice,rawGoods.retailPrice,
      rawGoods.currentCostPrice,rawGoods.currentRetailPrice,rawGoods.warning);
  }
}
