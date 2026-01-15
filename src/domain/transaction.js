// what is a transaction?
// validate (amount valid? date valid?)
// shape of transaction

function createTransaction(raw) {
    // normalized trans obj
}

function validateTransaction(tx) {
    //throws if invalid
}

function normalizeCtegory(category) {
    //
}

function isIncome() {
    //
}

function isExpense() {
    //
}

export function extractCategoryAndExpense(str) {
    // Extract category and description from string
    // by converting str to array 
    const normalizedStr = str;
    const wordsArray = normalizedStr.split(" ");

    const category = wordsArray[0];
    const remainingWords = wordsArray.slice(1);
    const description = remainingWords.join(" ")

    return {
        category,
        description
    }
}
