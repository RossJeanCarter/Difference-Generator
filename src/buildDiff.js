import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const getDiffItem = (key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], state: 'added' };
    }

    if (!_.has(data2, key)) {
      return { key, value: data1[key], state: 'removed' };
    }

    if (data1[key] === data2[key]) {
      return { key, value: data1[key], state: 'unchanged' };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: buildDiff(data1[key], data2[key]), state: 'complex' };
    }

    return { key, value: { oldValue: data1[key], newValue: data2[key] }, state: 'updated' };
  };

  const diffItems = sortedKeys.flatMap(getDiffItem);
  return diffItems;
};

export default buildDiff;
