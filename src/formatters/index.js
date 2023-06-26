import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const getFormatting = (diff, format) => {
  const formats = {
    stylish: formatStylish,
    plain: formatPlain,
    json: formatJson,
  };
  return formats[format](diff);
};

export default getFormatting;
