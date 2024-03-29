import moment from "moment";

export const getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
        dates = [...dates, moment(new Date(theDate)).format('DD.MM')];
        theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, moment(new Date(endDate)).format('DD.MM')];
    return dates;
}

export const compareDates = (date1, date2) => {
    const selectedDate1 = moment(date1).startOf('day').toISOString();
    const selectedDate2 = moment(date2).startOf('day').toISOString();
    return selectedDate1 === selectedDate2;
}