declare var moment: any;

export class DateUtils {

    public static formatDate(timestamps: number): string {
        return moment.unix(timestamps/1000).format("YYYY-MM-DD");
    }

    public static formatDateWithFormat(timestamps: number, format: string) {
        return moment.unix(timestamps/1000).format(format);
    }
    public static getTime(dateStr: string): number {
        return moment(dateStr).toDate().getTime();
    }

}