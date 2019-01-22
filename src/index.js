import { getPerms } from './perm';
import { getPermMaths } from './perm-math';

performance.mark('getPerms-start');
getPerms('A');
getPerms('AB');
getPerms('ABC');
getPerms('ABCD');
getPerms('ABCDE');
getPerms('ABCDEF');
performance.mark('getPerms-end');
performance.measure(
    'getPerms',
    'getPerms-start',
    'getPerms-end'
);
var measures = performance.getEntriesByName('getPerms');
var measure = measures[0];
console.log('getPerms milliseconds:', measure.duration, measures);
performance.clearMarks();
performance.clearMeasures();

performance.mark('getPermMaths-start');
getPermMaths('A');
getPermMaths('AB');
getPermMaths('ABC');
getPermMaths('ABCD');
getPermMaths('ABCDE');
getPermMaths('ABCDEF');
performance.mark('getPermMaths-end');
performance.measure(
    'getPermMaths',
    'getPermMaths-start',
    'getPermMaths-end'
);
var measures = performance.getEntriesByName('getPermMaths');
var measure = measures[0];
console.log('getPermMaths milliseconds:', measure.duration, measures);
performance.clearMarks();
performance.clearMeasures();