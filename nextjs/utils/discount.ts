import moment from "moment";

export function checkDiscountActive(discount_from : string, discount_to : string) {
    let today = new Date();
    let from = new Date(discount_from);
    let to = new Date(discount_to);
    if (from <= today && today <= to) {
      return true;
    }
    return false;
}

export function daysRemaining(date: string) {
    var eventdate = moment(date);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, "days");
  }