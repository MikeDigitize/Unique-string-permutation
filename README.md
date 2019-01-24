# Unique string permutation

## Install and run tests
```
yarn // to install
yarn test // to run tests
```

## Goal

Pass a string of characters and return an array of every unique combination of those characters. 

```javascript
'ABC' // ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
```

### Version 1 - Brute force recursion!

```
perm.js
```

Find every single combination of letters, including duplicates, and then return as a Set, which allows only unique values, spread into an array.

```javascript
let results = [];

for(let i = 0; i < input.length; i++) {

  let currentChar = input[i];

  // remove the current character from the string, leaving the remainder
  let inputStartToCurrentChar = input.substr(0, i);
  let currentCharToInputEnd = input.substr(i+1, input.length);
  
  let inputWithoutCurrentChar = `${inputStartToCurrentChar}${currentCharToInputEnd}`;

  // get an array of the current character combined with all the remaining characters
  let resultsPrependedWithCurrentChar = getPerms(inputWithoutCurrentChar).map(result => `${currentChar}${result}`);
  
  // add the results
  results = results.concat(resultsPrependedWithCurrentChar);

}

// auto unique-ify
return [
  ...new Set(results)
];
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

                let resultsPrependedWithCurrentChar = getPerms(inputWithoutCurrentChar).map(char => `${currentChar}${char}`);
                return result.concat(resultsPrependedWithCurrentChar);
                
            }, []);
```

### Version 2 - Mathematical recursion!

```
perm-math.js
```

This approach is taken from [this excellent visual explanation](https://youtu.be/nYFd7VHKyWQ) of how a precise recursive algorithm would solve the problem.

#### The gist of the algorithm

1. Take a set of chars e.g. 'ABC' and create an object representing the characters and their respective counts e.g. { A: 1, B: 1, C: 1 }. In the string 'ABC' there are one As, one B and one C.
```
'ABC' // { A: 1, B: 1, C: 1 }
```
Think of this first object as level zero in the recursion - it's important you remember the level!

Create a result array with the same length as the input string e.g. 'AABC' has a length of four, so create a result array with a length of four to hold each premutation.
```
'ABC' // length 3 
[,,] // empty array of length 3
```

Working in alphabetical order take the first char whose count is greater than zero - 'A.'
```
{ A: 1, B: 1, C: 1 } // A is the first character
```

Add this character to the *level* (index) of recursion in the result array - in this case zero.
```
[A,,]
```

Remember the last character found in the object. 
```
{ A: 1, B: 1, C: 1 } // last character used is A
```

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
{ A: 0, B: 0, C: 1 } // last character used is A
```

Create a copy of the object decreasing the last character by one.
```
{ A: 0, B: 0, C: 0 }
```
We're now one level deeper in the recursion - level three.

There are no more characters less than zero - this is the sign that a new permutation has been created!
Add the contents of the result array to a results array as a string.
```
[A,B,C]
'ABC'
['ABC'] // final results array
```

Now go back up a level in the recursion.
```
{ A: 0, B: 0, C: 1 } // last char was C
```

After the last char ('C') there are no more zeros, so go back up another level.
```
{ A: 0, B: 1 C: 1 } // last char was B
```

After the last char 'B', 'C' is the first available character.
We're at level 1 in the recursion so add 'C' at index one in the result array.
```
// note: the result array hasn't been emptied
[A,C,C]
```

Create a copy of the object decreasing the last character by one.
We're now one level deeper in the recursion (level two).
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

There are no more characters less than zero - this is the sign that a new permutation has been created!
Second result 'ACB'.

```
['ABC', 'ACB'] // final results array
```

Now go up again and repeat. Eventually following this pattern you'll end up with -
```
['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
```

This is a very neat mathematical solution with no wasted computations but, due to the complexity, takes longer than the previous, inelegant brute force solution. Such is life.

## Licence
MIT
