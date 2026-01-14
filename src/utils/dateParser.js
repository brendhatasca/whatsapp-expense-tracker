import { parse, format } from 'date-fns';

export function parseDate(dateStr) {
    // take string eg: jan 16 and
    // return Jan 16 2025
    let dateWithYear = dateStr;

    const today = new Date();
    const currentYear = format(today, 'yyyy');

    if (dateWithYear.split(" ").length == 2) {
        dateWithYear = `${dateWithYear} ${currentYear}`
    }

    // Use parse() to convert string into a valid Date obj
    const parsedDateObj = parse(dateWithYear, 'MMM d yyyy', new Date())
    const parsedDate = format(parsedDateObj, 'MMM d yyyy')

    return parsedDate;
}