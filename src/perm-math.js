/**
 * Unique permutations using maths
 * 
 * From - https://youtu.be/nYFd7VHKyWQ 
 */

/**
 * getFactorial
 * 
 * @param {number} x 
 * @returns {number}
 */

function getFactorial(x) {

    if (x === 0) {
        return 1;
    }
    return x * getFactorial(x - 1);

}

/**
 * getNumberOfOccurencesInString
 * 
 * @param {string} input 
 * @param {string} valueToFind 
 * @returns {number}
 */

function getNumberOfOccurencesInString(input, valueToFind) {

    return input
        .split('')
        .filter(str => valueToFind === str)
        .length;

}

/**
 * getNumberOfPermutations
 * 
 * @param {string} input 
 * @returns {number}
 * 
 * factorial of string length
 * -------------------------- (divided by)
 * multiplication of factorials of any character that appears more than once
 * 
 * e.g.
 * AABC
 * factorial of 4 / factorial of 2
 * 
 * AABBC
 * factorial of 5 / factorial of 2 * factorial of 2
 */

function getNumberOfPermutations(input) {

    if (!input.length) {
        return 0;
    }

    if (getNumberOfOccurencesInString(input, input[0]) === input.length) {
        return 1;
    }

    let { length } = input;
    let dividend = getFactorial(length);
    let divisor = 0

    while (input.length) {

        let firstChar = input[0];
        let occurences = getNumberOfOccurencesInString(input, firstChar);

        if (occurences > 1) {
            divisor += occurences;
        }

        input = input.replace(new RegExp(firstChar, 'g'), '');

    }

    return dividend / (divisor || 1);

}

/**
 * inputToObject
 * 
 * @param {string} input 
 * @returns {object}
 * 
 * takes a string input and converts it to an object
 * keys are the unique characters and their values are the amount of time they appear in the string
 * AAABBCD // { A: 3, B: 2, C: 1, D: 1 }
 */

function inputToObject(input) {

    let result = {}

    while (input.length) {

        let firstChar = input[0];
        result[firstChar] = getNumberOfOccurencesInString(input, firstChar);
        input = input.replace(new RegExp(firstChar, 'g'), '');

    }

    return result;

}

/**
 * getFirstAvailableCharacter
 * 
 * @param {object} input 
 * @param {number} startFromKeyIndex 
 * 
 * when passed the character count object, returns the next character that has a count higher than 1
 * e.g. { A: 0, B: 1, C: 2 } // B
 */

function getFirstAvailableCharacter(input, startFromKeyIndex = 0) {

    return Object
        .keys(input)
        .filter((key, i) => i >= startFromKeyIndex && input[key] > 0)
        .shift()
        || null;

}
 
/**
 * isInputObjectStillActive
 * 
 * @param {object} input 
 * 
 * if the character count object has all zeros as values it is inactive
 * e.g. { A: 0, B: 0 }
 */

function isInputObjectStillActive(input) {

    return !!Object
        .keys(input)
        .filter(key => input[key] > 0)
        .length;

}

/**
 * decrementCharacterCount
 * 
 * @param {object} input 
 * @param {charToDecrement} charToDecrement 
 */

function decrementCharacterCount(input, charToDecrement) {

    let nextInput = Object.assign({}, input);
    if (nextInput[charToDecrement] > 0) {
        nextInput[charToDecrement]--;
    }
    return nextInput;

}

/**
 * getPermMaths
 * 
 * @param {string} input 
 * @returns {array}
 * 
 * passed a string it returns all unique permutations through an efficient mathematical formula
 */

function getPermMaths(input) {

    let inputObject = inputToObject(input);
    let stack = [];

    // the stack level moves up and down dictating which array index chosen characters get stored within
    let stackLevel = 0;

    // the permutations get stored as individual characters in a result array 
    // and concatenated into a string as they're added to the final results array
    let result = [];
    let results = [];

    // let the maths guide us - the numbers of perms needed in the results array before the recursion can stop
    let numberOfPerms = getNumberOfPermutations(input);

    // the stack holds input objects of characters and their count
    stack.push({ inputObject, startFrom: 0 });

    while (results.length < numberOfPerms) {

        // get the current object to search and the starting index to search from (keys)
        inputObject = stack[stackLevel].inputObject;
        startFrom = stack[stackLevel].startFrom;

        // get the first character (key) whose value is greater than zero
        let firstAvailableChar = getFirstAvailableCharacter(inputObject, startFrom);

        // if the previous function doesn't return null
        if (firstAvailableChar !== null) {

            // add the character to the current perm
            result[stackLevel] = firstAvailableChar;
            // increment the key of the next character to start searching from
            stack[stackLevel].startFrom =
                Object
                    .keys(inputObject)
                    .indexOf(firstAvailableChar) + 1;

            // create a copy of the object with the last character's count decremented by one
            inputObject = decrementCharacterCount(inputObject, firstAvailableChar);
            // add the copy to the next level down in the stack array
            stackLevel++;
            stack[stackLevel] = {
                inputObject,
                startFrom: 0
            };

        }
        else {

            // if the input has all zeros as values the next permutation is complete 
            if (!isInputObjectStillActive(inputObject)) {
                results.push(result.join(''));
            }
            // go back up one in the stack and repeat
            stackLevel--;

        }

    }

    return results;

}

module.exports = {
    getNumberOfPermutations,
    getNumberOfOccurencesInString,
    inputToObject,
    getFirstAvailableCharacter,
    getPermMaths,
    decrementCharacterCount
};