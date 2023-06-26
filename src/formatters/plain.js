import _ from 'lodash';

const formatValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const formatPlain = (diff, path = []) => {
  const filterItems = diff.filter(({ state }) => state !== 'unchanged');

  const items = filterItems.map(({ key, value, state }) => {
    const newPath = path.concat(key);
    const node = newPath.join('.');
    switch (state) {
      case 'added': {
        const val = formatValue(value);
        return `Property '${node}' was added with value: ${val}`;
      }
      case 'removed':
        return `Property '${node}' was removed`;
      case 'updated': {
        const { oldValue, newValue } = value;
        const oldVal = formatValue(oldValue);
        const newVal = formatValue(newValue);
        return `Property '${node}' was updated. From ${oldVal} to ${newVal}`;
      }
      default:
        return formatPlain(value, newPath);
    }
  });
  return items.join('\n');
};

export default formatPlain;
