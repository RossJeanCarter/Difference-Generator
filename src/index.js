import { readFileSync } from 'fs';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(filepath1, 'utf8'));
  const data2 = JSON.parse(readFileSync(filepath2, 'utf8'));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysAll = _.union(keys1, keys2);
  const sortedKeys = _.orderBy((keysAll));
  const comparePaths = sortedKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (data1[key] === data2[key]) {
        acc += `\n    ${key}: ${data1[key]}`; //
      } else {
        acc += `\n  - ${key}: ${data1[key]}`;//-
        acc += `\n  + ${key}: ${data2[key]}`;//+
      }
    } else if (keys1.includes(key)) {
      acc += `\n  - ${key}: ${data1[key]}`;//-
    } else if (keys2.includes(key)) {
      acc += `\n  + ${key}: ${data2[key]}`;//+
    }
    return acc;
  }, '{');
  const result = `${comparePaths}\n}`;
  console.log(result);
  return result;
};
