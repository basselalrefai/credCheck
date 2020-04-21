// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];


// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Create a function to validate credit card numbers using the Luhn algorithim:

// Declare the function validateCred with the parameter of an array
const validateCred = arr => {
    //declare a variable that is an array using .slice
    let numberTest = arr.slice();
    //pop the check number from the new array
    numberTest.pop();
    //reverse the new array
    numberTest.reverse();
    //Create a for loop through odd digits (increases by a rate of 2)
    for (i = 0; i < numberTest.length; i += 2) {
        //Multiply each odd number by 2
        numberTest[i] *= 2;
        //if number is greater than 9 subtract 9
        if (numberTest[i] > 9) {
            numberTest[i] -= 9
        }
    }
    //Add all the numbers in an array
    //create a variable to use the reduce method
    let sumTotal = numberTest.reduce((a, b) => a + b, 0);
    // set a variable for the check number to include the total sum and the poped number
    let num1 = sumTotal + numberTest.pop();
    //condition to check if the sum is divideble by 10 to determine if the number is true or false
    if (num1 % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

//create a function that checks through the nested array for which numbers are invalid
//Create new array for invalid cards
const invalidCards = [];
//declare the function
const findInvalidCards = batch => {
    //declare a variable for batchIndex
    let batchIndex = 0;
    //loop through the batch array
    for (let batchIndex = 0; batchIndex < batch.length; batchIndex++) {
        // condition for if the card number is invalid
        if (validateCred(batch[batchIndex]) === false) {
            // push the card to the invalid array
            invalidCards.push(batch[batchIndex]);
        }
    }
    //return value of invalidCards array
    return invalidCards;
}

findInvalidCards(batch);

//Create a function to id companies that issued invalid cards
//declare the function
const idInvalidCardCompanies = invalidCards => {
    // set an array to push to
    const companies = [];
    //for loop through invalidCards
    for (i = 0; i < invalidCards.length; i++) {
        switch (invalidCards[i][0]) {
            case 3:
                if (companies.indexOf('Amex (American Express)') === -1) {
                    companies.push('Amex (American Express)');
                }
                break;
            case 4:
                if (companies.indexOf('Visa') === -1) {
                    companies.push('Visa');
                }
                break;
            case 5:
                if (companies.indexOf('Mastercard') === -1) {
                    companies.push('Mastercard');
                }
                break;
            case 6:
                if (companies.indexOf('Discover') === -1) {
                    companies.push('Discover');
                }
                break;
            default:
                console.log('Company not found.')
        }
    }
    return companies;
}