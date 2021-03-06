# Unique string permutation

## Install and run tests
```
yarn
yarn test
```

### Goal

Pass a string of characters and return an array of every unique combination of those characters. 

```javascript
'ABC' // ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
```

## Version 1 - Brute force recursion!

```
perm.js
```

Loop through each character finding every single combination with the remaining letters, including duplicates, and return as a Set, which allows only unique values, spread into an array.

```javascript
function getPerms(input) {

  let results = [];

  for(let i = 0; i < input.length; i++) {

    let currentChar = input[i];

    // remove the current character from the string, leaving the remainder
    let inputStartToCurrentChar = input.substr(0, i);
    let currentCharToInputEnd = input.substr(i+1, input.length);

    let inputWithoutCurrentChar = `${inputStartToCurrentChar}${currentCharToInputEnd}`;

    // get an array of the current character combined with all the remaining characters
    let resultsPrependedWithCurrentChar = 
      getPerms(inputWithoutCurrentChar).map(result => `${currentChar}${result}`);

    // add the results
    results = results.concat(resultsPrependedWithCurrentChar);

  }

  // auto unique-ify
  return [
    ...new Set(results)
  ];
  
}
```

You could replace the `for` loop with a `reduce` function if you're that way inclined.

```javascript
let results = 
        input
            .split('')
            .reduce(function(result, currentChar) {

                let i = input.indexOf(currentChar);
                let inputStartToCurrentChar = input.substr(0, i);
                let currentCharToInputEnd = input.substr(i+1, input.length);

                let inputWithoutCurrentChar = `${inputStartToCurrentChar}${currentCharToInputEnd}`;

                let resultsPrependedWithCurrentChar = 
                  getPerms(inputWithoutCurrentChar).map(char => `${currentChar}${char}`);
                  
                return result.concat(resultsPrependedWithCurrentChar);
                
            }, []);
```

## Version 2 - Mathematical recursion!

```
perm-math.js
```

This approach is taken from [this excellent visual explanation](https://youtu.be/nYFd7VHKyWQ) of how a precise recursive algorithm would solve the problem.
  
### 1. Convert the string to an object

Take a set of chars e.g. 'ABC' and create an object representing the characters and their respective counts e.g. { A: 1, B: 1, C: 1 }. In the string 'ABC' there is one A, one B and one C.
```
'ABC' // { A: 1, B: 1, C: 1 }
```
Think of this first object as level zero in the recursion - it's important you remember the level!
  
### 2. Create a result array for a permutation
Create a result array with the same length as the input string e.g. 'AABC' has a length of four, so create a result array with a length of four to hold each permutation.
```
'ABC' // length 3 
[,,] // empty array of length 3
```
   
### 3. Find the first character
Working in alphabetical order take the first char whose count is greater than zero - 'A.'
```
{ A: 1, B: 1, C: 1 } // A is the first character
```
  
### 4. Add it to the result
Add this character to the *level* (index) of recursion in the result array - in this case zero.
```
[A,,]
```
  
Remember the last character found in the object. 
```
{ A: 1, B: 1, C: 1 } // last character used is A
```

### 5. Go one level deeper into the recursion
Create a copy of the object decreasing the last character by one.
```
{ A: 0, B: 1, C: 1 }
```
We're now one level deeper in the recursion - level one.

First char greater than zero is 'B.'
The last char used on this object is 'B.'
We're at level one in the recursion.
Add this char at level (index) one in the result array.
```
[A,B,]
{ A: 0, B: 1, C: 1 } // last character used is B
```
  
### 6. Go another level deeper
Create a copy of the object decreasing the last character by one. 
```
{ A: 0, B: 0, C: 1 }
```
We're now one level deeper in the recursion - level two.

First char greater than zero is 'C.'
The last char used on this object is 'C.'
We're at level 2 in the recursion.
Add C at index two in the array. 
```
[A,B,C]
{ A: 0, B: 0, C: 1 } // last character used is C
```
  
### 7. Permutation complete!
Create a copy of the object decreasing the last character by one.
```
{ A: 0, B: 0, C: 0 }
```
We're now one level deeper in the recursion - level three.

There are no characters with a value greater than zero - all characters at zero is the sign that a new permutation has been created!
Add the contents of the result array to a (final) results array, as a string.
```
[A,B,C] // 'ABC' to string
['ABC'] // final results array
```
  
### 8. Work your way back up the recursion 
Now go back up a level in the recursion.
```
{ A: 0, B: 0, C: 1 } // last char was C
```

After the last char ('C') there are no more characters left, so go back up another level.
```
{ A: 0, B: 1 C: 1 } // last char was B
```

After the last char 'B', 'C' is the first character with a value greater than zero.
We're at level one in the recursion so add 'C' at index one in the result array.
```
// note: the result array hasn't been emptied
[A,C,C]
```
  
### 9. Once you've found a match, go back down
Create a copy of the object decreasing the last character by one.
We're now one level deeper in the recursion - level two.
```
{ A: 0, B: 1, C: 0 }
```

The first char available is 'B' so add 'B' to the result array at index two.
```
[A,C,B]
```

Create a copy of the object decreasing the last character by one. 
```
{ A: 0, B: 0, C: 0 }
```
We're now one level deeper in the recursion - level three.

There are no characters greater than zero - a new permutation has been created!
Second result - 'ACB'.

```
['ABC', 'ACB'] // final results array
```
  
### 10. Repeat until your first object yeilds no more results
Now go up again and repeat. Eventually following this pattern you'll end up with -
```
['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
```

This is a very neat mathematical solution with no wasted computations but, due to the complexity, takes longer than the previous, inelegant brute force solution. Such is life.

## Licence
MIT
