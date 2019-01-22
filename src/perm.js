function getPerms(input) {

    // quick win if A, hh, GGGG, zzzzzzzzzzz etc
    let inputUsesOnlyOneChar = 
        !input
            .split('')
            .filter(char => char !== input[0])
            .length;

    if(inputUsesOnlyOneChar) {
        return [
            input
        ];
    }

    let results = [];

    for(let i = 0; i < input.length; i++) {
        
        let currentChar = input[i];

        // remove the current character from the string
        let inputStartToCurrentChar = input.substr(0, i);
        let currentCharToInputEnd = input.substr(i+1, input.length);
        let inputWithoutCurrentChar = `${inputStartToCurrentChar}${currentCharToInputEnd}`;

        // get an array of the current character combined with all the remaining characters
        let resultsPrependedWithCurrentChar = getPerms(inputWithoutCurrentChar).map(result => `${currentChar}${result}`);
        results = results.concat(resultsPrependedWithCurrentChar);
        
    }

    // auto unique-ify
    return [
        ...new Set(results)
    ];
    
}


module.exports = { 
    getPerms 
};