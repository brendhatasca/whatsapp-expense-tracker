import { parse, format } from 'date-fns';

export function parseDate(monthStr, day) {
    // take string eg: jan 16 and
    // return Jan 16 2025
    const formattedMonthStr = monthStr.charAt(0).toUpperCase() + monthStr.slice(1).toLowerCase();
    const today = new Date();
    const currentYear = format(today, 'yyyy');

    const dateWithYear = `${formattedMonthStr} ${day} ${currentYear}`;

    // Use parse() to convert string into a valid Date obj
    const parsedDateObj = parse(dateWithYear, 'MMM d yyyy', new Date());
    const parsedDate = format(parsedDateObj, 'MMM d yyyy');
    const parsedMonth = format(parsedDateObj, 'MMMM');

    return {
        date: parsedDate,
        month: parsedMonth
    };
}
//  ./src/utils/dateParser.js