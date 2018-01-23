export class NumberUtil {

    public static validateNumber(money: number): boolean {
        if(money>99999999) {
            return false;
        }
        return true;
    }
}