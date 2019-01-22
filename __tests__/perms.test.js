const { 
    getNumberOfPermutations, 
    getNumberOfOccurencesInString,
    inputToObject,
    getFirstAvailableCharacter,
    getPermMaths,
    decrementCharacterCount
} = require('../src/perm-math');

const { getPerms } = require('../src/perm');

describe('\nNon mathematical recursion\n', function() {

    /**
     * getPerms
     */

    it('should return an array with a single character when passed a single character string', function() {
        expect(getPerms('a')).toHaveLength(1);
        expect(getPerms('a')[0]).toBe('a');
    });

    it('should return one permutation when passed a two character string of same letter', function() {
        expect(getPerms('aa')).toHaveLength(1);
        expect(getPerms('aa')[0]).toBe('aa');
    });

    it('should return one permutation when passed a ten character string of same letter', function() {
        expect(getPerms('aaaaaaaaaa')).toHaveLength(1);
        expect(getPerms('aaaaaaaaaa')[0]).toBe('aaaaaaaaaa');
    });

    it('should return two permutations when passed a two character string', function() {
        expect(getPerms('ab')).toHaveLength(2);
        expect(getPerms('ab')[0]).toBe('ab');
        expect(getPerms('ab')[1]).toBe('ba');
    });

    it('should return two permutations when passed a two character string', function() {
        expect(getPerms('zy')).toHaveLength(2);
        expect(getPerms('zy')[0]).toBe('zy');
        expect(getPerms('zy')[1]).toBe('yz');
    });

    it('should return six permutations when passed a three character string', function() {
        expect(getPerms('abc')).toHaveLength(6);
        expect(getPerms('abc')[0]).toBe('abc');
        expect(getPerms('abc')[1]).toBe('acb');
        expect(getPerms('abc')[2]).toBe('bac');
        expect(getPerms('abc')[3]).toBe('bca');
        expect(getPerms('abc')[4]).toBe('cab');
        expect(getPerms('abc')[5]).toBe('cba');
    });

    it('should return six permutations when passed a three character string', function() {
        expect(getPerms('ytr')).toHaveLength(6);
        expect(getPerms('ytr')[0]).toBe('ytr');
        expect(getPerms('ytr')[1]).toBe('yrt');
        expect(getPerms('ytr')[2]).toBe('tyr');
        expect(getPerms('ytr')[3]).toBe('try');
        expect(getPerms('ytr')[4]).toBe('ryt');
        expect(getPerms('ytr')[5]).toBe('rty');
    });

    it('should return six permutations when passed a three character string', function() {
        const TEST = '123';
        const RESULT = getPerms(TEST);
        expect(RESULT).toHaveLength(6);
        expect(RESULT[0]).toBe('123');
        expect(RESULT[1]).toBe('132');
        expect(RESULT[2]).toBe('213');
        expect(RESULT[3]).toBe('231');
        expect(RESULT[4]).toBe('312');
        expect(RESULT[5]).toBe('321');
    });

    it('should return twenty four permutations when passed a four character string', function() {
        const TEST = 'ABCD';
        const RESULT = getPerms(TEST);
        const EXPECTED_RESULTS = [
            'ABCD',
            'ABDC',
            'ACBD',
            'ACDB',
            'ADBC',
            'ADCB',
            'BACD',
            'BADC',
            'BCAD',
            'BCDA'
        ];
        expect(RESULT).toHaveLength(24);
        expect(RESULT[0]).toBe(EXPECTED_RESULTS[0]);
        expect(RESULT[1]).toBe(EXPECTED_RESULTS[1]);
        expect(RESULT[2]).toBe(EXPECTED_RESULTS[2]);
        expect(RESULT[3]).toBe(EXPECTED_RESULTS[3]);
        expect(RESULT[4]).toBe(EXPECTED_RESULTS[4]);
        expect(RESULT[5]).toBe(EXPECTED_RESULTS[5]);
        expect(RESULT[6]).toBe(EXPECTED_RESULTS[6]);
        expect(RESULT[7]).toBe(EXPECTED_RESULTS[7]);
        expect(RESULT[8]).toBe(EXPECTED_RESULTS[8]);
        expect(RESULT[9]).toBe(EXPECTED_RESULTS[9]);
    });

    it('should return twelve permutations when passed a four character string with two chars the same', function() {
        const TEST = 'ABBD';
        const RESULT = getPerms(TEST);
        const EXPECTED_RESULTS = [
            'ABBD',
            'ABDB',
            'ADBB',
            'BABD',
            'BADB',
            'BBAD',
            'BBDA',
            'BDAB',
            'BDBA',
            'DABB',
            'DBAB',
            'DBBA'
        ];
        expect(RESULT).toHaveLength(12);
        expect(RESULT[0]).toBe(EXPECTED_RESULTS[0]);
        expect(RESULT[1]).toBe(EXPECTED_RESULTS[1]);
        expect(RESULT[2]).toBe(EXPECTED_RESULTS[2]);
        expect(RESULT[3]).toBe(EXPECTED_RESULTS[3]);
        expect(RESULT[4]).toBe(EXPECTED_RESULTS[4]);
        expect(RESULT[5]).toBe(EXPECTED_RESULTS[5]);
        expect(RESULT[6]).toBe(EXPECTED_RESULTS[6]);
        expect(RESULT[7]).toBe(EXPECTED_RESULTS[7]);
        expect(RESULT[8]).toBe(EXPECTED_RESULTS[8]);
        expect(RESULT[9]).toBe(EXPECTED_RESULTS[9]);
        expect(RESULT[10]).toBe(EXPECTED_RESULTS[10]);
        expect(RESULT[11]).toBe(EXPECTED_RESULTS[11]);
    });

});

describe('\nMathematical recursion\n', function() {

    /**
     * getNumberOfOccurencesInString
     */

    test('gets number of occurrences in a string', function() {

        const target = 'A';
        expect(getNumberOfOccurencesInString(target, 'Z')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'B')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'A')).toEqual(1);
        expect(getNumberOfOccurencesInString(target, 'C')).not.toEqual(1);

    });

    test('gets number of occurrences in a string', function() {

        const target = 'AA';
        expect(getNumberOfOccurencesInString(target, 'Z')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'B')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'A')).toEqual(2);
        expect(getNumberOfOccurencesInString(target, 'C')).not.toEqual(1);

    });

    test('gets number of occurrences in a string', function() {

        const target = 'AAB';
        expect(getNumberOfOccurencesInString(target, 'Z')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'B')).toEqual(1);
        expect(getNumberOfOccurencesInString(target, 'A')).toEqual(2);
        expect(getNumberOfOccurencesInString(target, 'C')).not.toEqual(1);

    });

    test('gets number of occurrences in a string', function() {

        const target = 'AABC';
        expect(getNumberOfOccurencesInString(target, 'Z')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'B')).toEqual(1);
        expect(getNumberOfOccurencesInString(target, 'A')).toEqual(2);
        expect(getNumberOfOccurencesInString(target, 'C')).not.toEqual(0);

    });

    test('gets number of occurrences in a string', function() {

        const target = 'AAAA';
        expect(getNumberOfOccurencesInString(target, 'Z')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'B')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'A')).toEqual(4);
        expect(getNumberOfOccurencesInString(target, 'C')).not.toEqual(1);

    });

    test('gets number of occurrences in a string', function() {

        const target = '';
        expect(getNumberOfOccurencesInString(target, 'Z')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'B')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'A')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'C')).not.toEqual(1);

    });

    test('gets number of occurrences in a string', function() {

        const target = 'AAAAAAAAAB';
        expect(getNumberOfOccurencesInString(target, 'Z')).toEqual(0);
        expect(getNumberOfOccurencesInString(target, 'B')).toEqual(1);
        expect(getNumberOfOccurencesInString(target, 'A')).toEqual(9);
        expect(getNumberOfOccurencesInString(target, 'C')).not.toEqual(1);

    });

    /**
     * 
     * get string expected permutations
     * 
     */

     test('get number of unique permutations in a string', function() {

        expect(getNumberOfPermutations('AABC')).toBe(12);
        expect(getNumberOfPermutations('ABC')).toBe(6);
        expect(getNumberOfPermutations('AB')).toBe(2);
        expect(getNumberOfPermutations('A')).toBe(1);
        expect(getNumberOfPermutations('')).toBe(0);

     });
    

    /**
     * inputToObject
     */

    test('turn a string input to object with keys of letters in string and values of totals of those letters', function() {

        let result = inputToObject('');
        expect(Object.keys(result)).toHaveLength(0);

        result = inputToObject('A');
        expect(Object.keys(result)).toHaveLength(1);
        expect(result[Object.keys(result)[0]]).toEqual(1);

        result = inputToObject('AA');
        expect(Object.keys(result)).toHaveLength(1);
        expect(result[Object.keys(result)[0]]).toEqual(2);

        result = inputToObject('AAAAA');
        expect(Object.keys(result)).toHaveLength(1);
        expect(result[Object.keys(result)[0]]).toEqual(5);

        result = inputToObject('AAB');
        expect(Object.keys(result)).toHaveLength(2);
        expect(result[Object.keys(result)[0]]).toEqual(2);
        expect(result[Object.keys(result)[1]]).toEqual(1);

        result = inputToObject('AABC');
        expect(Object.keys(result)).toHaveLength(3);
        expect(result[Object.keys(result)[0]]).toEqual(2);
        expect(result[Object.keys(result)[1]]).toEqual(1);
        expect(result[Object.keys(result)[2]]).toEqual(1);

        result = inputToObject('AABBCCDDDDDD');
        expect(Object.keys(result)).toHaveLength(4);
        expect(result[Object.keys(result)[0]]).toEqual(2);
        expect(result[Object.keys(result)[1]]).toEqual(2);
        expect(result[Object.keys(result)[2]]).toEqual(2);
        expect(result[Object.keys(result)[3]]).toEqual(6);

    });
    
    /**
     * getFirstAvailableCharacter
     */

    test('gets first key whose value is not zero', function() {

        let target = {};
        expect(getFirstAvailableCharacter(target)).toBe(null);

        let A;
        target = { A };
        expect(getFirstAvailableCharacter(target)).toBe(null);

        target = { A: 0 };
        expect(getFirstAvailableCharacter(target)).toBe(null);

        target = { A: 1 };
        expect(getFirstAvailableCharacter(target)).toBe('A');

        target = { A: 0, B: 0 };
        expect(getFirstAvailableCharacter(target)).toBe(null);

        target = { A: 0, B: 1 };
        expect(getFirstAvailableCharacter(target)).toBe('B');

        target = {
            A: 1,
            B: 1,
            C: 1
        };
        expect(getFirstAvailableCharacter(target)).toBe('A');

        target = {
            A: 0,
            B: 0,
            C: 0
        };
        expect(getFirstAvailableCharacter(target)).toBe(null);

        target = {
            a: 0,
            y: 0,
            x: 0
        };
        expect(getFirstAvailableCharacter(target)).toBe(null);

        target = {
            a: 0,
            y: 0,
            x: 1
        };
        expect(getFirstAvailableCharacter(target)).toBe('x');

        target = {
            a: 0,
            b: 1,
            c: 1
        };

        expect(getFirstAvailableCharacter(target)).toBe('b');

    });

    /**
     * decrementCharacterCount
     */

    test('should decrement the count of a character on an object with chars and keys and count as values', function() {
        const target = { A: 1 };
        const result = decrementCharacterCount(target, 'A');
        expect(result['A']).toBe(0);
    });

    test('should decrement the count of a character on an object with chars and keys and count as values', function() {
        const target = { A: 0 };
        const result = decrementCharacterCount(target, 'A');
        expect(result['A']).toBe(0);
    });

    test('should decrement the count of a character on an object with chars and keys and count as values', function() {
        const target = { A: 1, B: 1 };
        const result = decrementCharacterCount(target, 'B');
        expect(result['A']).toBe(1);
        expect(result['B']).toBe(0);
    });

    test('should decrement the count of a character on an object with chars and keys and count as values', function() {
        const target = { A: 1, B: 1 };
        const result = decrementCharacterCount(target, 'C');
        expect(result['A']).toBe(1);
        expect(result['B']).toBe(1);
    });

    /**
     * getPermMaths
     */

    it('should return an array with a single character when passed a single character string', function() {
        expect(getPermMaths('a')).toHaveLength(1);
        expect(getPermMaths('a')[0]).toBe('a');
    });

    it('should return one permutation when passed a two character string of same letter', function() {
        expect(getPermMaths('aa')).toHaveLength(1);
        expect(getPermMaths('aa')[0]).toBe('aa');
    });

    it('should return one permutation when passed a ten character string of same letter', function() {
        expect(getPermMaths('aaa')).toHaveLength(1);
        expect(getPermMaths('aaaaaaaaaa')[0]).toBe('aaaaaaaaaa');
    });

    it('should return two permutations when passed a two character string', function() {
        expect(getPermMaths('ab')).toHaveLength(2);
        expect(getPermMaths('ab')[0]).toBe('ab');
        expect(getPermMaths('ab')[1]).toBe('ba');
    });

    it('should return two permutations when passed a two character string', function() {
        expect(getPermMaths('zy')).toHaveLength(2);
        expect(getPermMaths('zy')[0]).toBe('zy');
        expect(getPermMaths('zy')[1]).toBe('yz');
    });

    it('should return six permutations when passed a three character string', function() {
        expect(getPermMaths('abc')).toHaveLength(6);
        expect(getPermMaths('abc')[0]).toBe('abc');
        expect(getPermMaths('abc')[1]).toBe('acb');
        expect(getPermMaths('abc')[2]).toBe('bac');
        expect(getPermMaths('abc')[3]).toBe('bca');
        expect(getPermMaths('abc')[4]).toBe('cab');
        expect(getPermMaths('abc')[5]).toBe('cba');
    });

    it('should return six permutations when passed a three character string', function() {
        expect(getPermMaths('ytr')).toHaveLength(6);
        expect(getPermMaths('ytr')[0]).toBe('ytr');
        expect(getPermMaths('ytr')[1]).toBe('yrt');
        expect(getPermMaths('ytr')[2]).toBe('tyr');
        expect(getPermMaths('ytr')[3]).toBe('try');
        expect(getPermMaths('ytr')[4]).toBe('ryt');
        expect(getPermMaths('ytr')[5]).toBe('rty');
    });

    it('should return six permutations when passed a three character string', function() {
        const TEST = '123';
        const RESULT = getPermMaths(TEST);
        expect(RESULT).toHaveLength(6);
        expect(RESULT[0]).toBe('123');
        expect(RESULT[1]).toBe('132');
        expect(RESULT[2]).toBe('213');
        expect(RESULT[3]).toBe('231');
        expect(RESULT[4]).toBe('312');
        expect(RESULT[5]).toBe('321');
    });

    it('should return twenty four permutations when passed a four character string', function() {
        const TEST = 'ABCD';
        const RESULT = getPermMaths(TEST);
        const EXPECTED_RESULTS = [
            'ABCD',
            'ABDC',
            'ACBD',
            'ACDB',
            'ADBC',
            'ADCB',
            'BACD',
            'BADC',
            'BCAD',
            'BCDA'
        ];
        expect(RESULT).toHaveLength(24);
        expect(RESULT[0]).toBe(EXPECTED_RESULTS[0]);
        expect(RESULT[1]).toBe(EXPECTED_RESULTS[1]);
        expect(RESULT[2]).toBe(EXPECTED_RESULTS[2]);
        expect(RESULT[3]).toBe(EXPECTED_RESULTS[3]);
        expect(RESULT[4]).toBe(EXPECTED_RESULTS[4]);
        expect(RESULT[5]).toBe(EXPECTED_RESULTS[5]);
        expect(RESULT[6]).toBe(EXPECTED_RESULTS[6]);
        expect(RESULT[7]).toBe(EXPECTED_RESULTS[7]);
        expect(RESULT[8]).toBe(EXPECTED_RESULTS[8]);
        expect(RESULT[9]).toBe(EXPECTED_RESULTS[9]);
    });

    it('should return twelve permutations when passed a four character string with two chars the same', function() {
        const TEST = 'ABBD';
        const RESULT = getPermMaths(TEST);
        const EXPECTED_RESULTS = [
            'ABBD',
            'ABDB',
            'ADBB',
            'BABD',
            'BADB',
            'BBAD',
            'BBDA',
            'BDAB',
            'BDBA',
            'DABB',
            'DBAB',
            'DBBA'
        ];
        expect(RESULT).toHaveLength(12);
        expect(RESULT[0]).toBe(EXPECTED_RESULTS[0]);
        expect(RESULT[1]).toBe(EXPECTED_RESULTS[1]);
        expect(RESULT[2]).toBe(EXPECTED_RESULTS[2]);
        expect(RESULT[3]).toBe(EXPECTED_RESULTS[3]);
        expect(RESULT[4]).toBe(EXPECTED_RESULTS[4]);
        expect(RESULT[5]).toBe(EXPECTED_RESULTS[5]);
        expect(RESULT[6]).toBe(EXPECTED_RESULTS[6]);
        expect(RESULT[7]).toBe(EXPECTED_RESULTS[7]);
        expect(RESULT[8]).toBe(EXPECTED_RESULTS[8]);
        expect(RESULT[9]).toBe(EXPECTED_RESULTS[9]);
        expect(RESULT[10]).toBe(EXPECTED_RESULTS[10]);
        expect(RESULT[11]).toBe(EXPECTED_RESULTS[11]);
    });

});