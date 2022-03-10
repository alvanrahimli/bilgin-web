import * as moment from "moment";

export function localizeDateTime(initialDate: Date): Date {
    return moment.utc(initialDate).local().toDate();
}