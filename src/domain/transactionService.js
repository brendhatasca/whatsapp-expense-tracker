// what to do with transaction
// parsing text into transaction
// group by category
// parse query -> get monthly transaction, calc monthly total
// rules -> if date missing, assume todays

import { parseDate } from "../utils/dateParser.js";
import { extractCategoryAndExpense } from "./transaction.js";

// pattern 1: date + amount + category + description
// pattern 2: amount + category + description

const CATEGORIES = [
    'groceries', 'rent', 'food', 'gas', 'transportation',
    'shopping', 'health', 'entertainment'
]

function parseExpense(msg) {
    // Takes msg body string, matches with pattern and converts into an Object 

    const trimmed = msg.trim().toLowerCase();

    const withDatePattern = /^([a-z]+)\s+(\d+)\s+(\d+(?:\.\d{1,2})?)\s+(?:(?:for|on)\s+)?(.+)$/i;
    const noDatePattern = /^(\d+(?:\.\d{1,2})?)\s+(?:(?:for|on)\s+)?(.+)$/i;

    let match; 
    let date, month, amount, categoryAndExpense;

    if (withDatePattern.test(trimmed)) {
        match = trimmed.match(withDatePattern); // returns array -> ['Jan', '16', '100', 'groceries foodbasics']
        ({ date, month } = parseDate(match[1], match[2]));
        amount = parseFloat(match[3]);
        categoryAndExpense = match[4];
        console.log(date, month, amount);
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
