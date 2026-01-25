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

const CATEGORIES = [
    'groceries', 'rent', 'food', 'gas', 'transportation',
    'shopping', 'health', 'entertainment'
]

export function extractCategoryAndExpense(str) {
    // Extract category and description from string
    // by converting str to array 
    const normalizedStr = str;
    const wordsArray = normalizedStr.split("/\s+/");
    const firstWord = wordsArray[0];

    if (CATEGORIES.includes(firstWord)) {
        const category = capitalize(firstWord);
        const description = wordsArray.slice(1).join(' ') || category;
        return { category, description };
    }

    for (const cat of CATEGORIES) {
        if (str.includes(cat)) {
            return { 
                category: capitalize(cat), 
                description: str 
            };
        };
    };
    return {
        category,
        description
    };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
