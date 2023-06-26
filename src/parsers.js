import yaml from 'js-yaml';

const parse = (data, format) => {
  const formatters = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  return formatters[format](data);
};

export default parse;
