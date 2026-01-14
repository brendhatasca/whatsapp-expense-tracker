import { parse, format } from 'date-fns';

export function parseDate(date) {
    // take string eg: jan 16 and
    // return Jan 16 2025
    let rawDate = date;

    const year = format(new Date(), 'yyyy');

    if (rawDate.split(" ") == 2) {
        rawDate = `${date} ${year}`
    }

    const parsedDate = format(rawDate, 'MMM d yyyy')

    return parsedDate;
}

console.log(parseDate('jan 16'))