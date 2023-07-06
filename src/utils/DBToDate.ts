import moment from "moment"
export const DBtoDate = (date: string) => {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
}