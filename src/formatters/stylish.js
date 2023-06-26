import _ from 'lodash';

const indent = 4;
const getIndentLine = (depth) => `  ${' '.repeat(indent).repeat(depth - 1)}`;
const getIndentBracket = (depth) => `${' '.repeat(indent).repeat(depth)}`;
const generateLine = (key, value, char, depth) => `${getIndentLine(depth)}${char}${key}: ${value}`;
const wrapBrackets = (body, depth) => `{\n${body}\n${getIndentBracket(depth)}}`;

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => generateLine(key, formatValue(val, depth + 1), '  ', depth + 1));
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};

const processDiff = (diff, depth) => {
  const chars = { added: '+ ', removed: '- ', unchanged: '  ' };

  const items = diff.flatMap(({ key, value, state }) => {
    switch (state) {
      case 'complex':
        return generateLine(key, processDiff(value, depth + 1), '  ', depth + 1);
      case 'updated':
        return [generateLine(key, formatValue(value.oldValue, depth + 1), chars.removed, depth + 1),
          generateLine(key, formatValue(value.newValue, depth + 1), chars.added, depth + 1)];
      default:
        return generateLine(key, formatValue(value, depth + 1), chars[state], depth + 1);
    }
  });
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};
const formatStylish = (diff) => processDiff(diff, 0);
export default formatStylish;
