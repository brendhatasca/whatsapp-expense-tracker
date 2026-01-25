// what to do with transaction
// parsing text into transaction
// group by category
// parse query -> get monthly transaction, calc monthly total
// rules -> if date missing, assume todays

import { parseDate, getTodaysMonthAndDate } from "../utils/dateHelper.js";
import { extractCategoryAndExpense } from "./transaction.js";


function parseIncome(txt) {
    // Takes msg body string, matches with pattern, extracts data and converts into an Object - "Jan 18 1600 from paychck" "150 from mom"
    const trimmed = txt.trim().toLowerCase();
    
    // pattern 1: date + amount + category
    // pattern 2: amount + category
    const withDatePattern = /^([a-z]+)\s+(\d+)\s+(\d+(?:\.\d{1,2})?)\s+(?:(?:from)\s+)?(.+)$/i;
    const noDatePattern = /^(\d+(?:\.\d{1,2})?)\s+(?:(?:from)\s+)?(.+)$/i;

    let match;
    let date, month, amount, category;

    if (withDatePattern.test(trimmed)) {
        match = trimmed.match(withDatePattern); // returns array ['Jan 16 800 for rent', 'Jan', '16', '800', 'rent']
        const parsedDate = parseDate(match[1], parseInt(match[2]));
        date = parsedDate.date;
        month = parsedDate.month;
        amount = parseFloat(match[3]);
        category = match[4];
    } else if (noDatePattern.test(trimmed)) {
        match = trimmed.match(noDatePattern); // returns array ['800 for rent', '800', 'rent']
        ({ date, month } = getTodaysMonthAndDate());
        amount = parseFloat(match[1]);
        category = match[2];
    }

    return {
        date,
        month,
        amount,
        type: "Income",
        category,
        description: "Income"
    }
}


function parseExpense(txt) {
    // Takes msg body string, matches with pattern, extracts data and returns an Object 

    const trimmed = txt.trim().toLowerCase();

    // pattern 1: date + amount + category + description
    // pattern 2: amount + category + description
    const withDatePattern = /^([a-z]+)\s+(\d+)\s+(\d+(?:\.\d{1,2})?)\s+(?:(?:for|on)\s+)?(.+)$/i;
    const noDatePattern = /^(\d+(?:\.\d{1,2})?)\s+(?:(?:for|on)\s+)?(.+)$/i;

    let match; 
    let date, month, amount, categoryAndExpense;

    if (withDatePattern.test(trimmed)) {
        match = trimmed.match(withDatePattern); // returns array -> ['Jan', '16', '100', 'groceries foodbasics']
        const parsedDate = parseDate(match[1], parseInt(match[2]));
        date = parsedDate.date;
        month = parsedDate.month;
        amount = parseFloat(match[3]);
        categoryAndExpense = match[4];
    } else if (noDatePattern.test(trimmed)) {
        match = trimmed.match(noDatePattern); // returns ['100', 'groceries', 'foodbasics]
        ({ date, month } = getTodaysMonthAndDate());
        amount = parseFloat(match[1]);
        categoryAndExpense = match[2];
    }

    const { category, description } = extractCategoryAndExpense(categoryAndExpense);
    
    return {
        date,
        month,
        amount,
        type: "Expense",
        category,
        description
    }
}

function parseQuery() {
    // "show me January expenses"
}

function getMonthlyTransactions(year, month) {
    //
}

function getRecentTransactions() {
    //
}
