import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import getFormatting from './formatters/index.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const getFormat = (file) => path.extname(file).slice(1);

const parser = (file1, file2, format = 'stylish') => {
  const path1 = getPath(file1);
  const path2 = getPath(file2);

  const formatNameFile1 = getFormat(file1);
  const formatNameFile2 = getFormat(file2);

  const data1 = parse(readFileSync(path1), formatNameFile1);
  const data2 = parse(readFileSync(path2), formatNameFile2);

  const diff = buildDiff(data1, data2);

  const formatedDiff = getFormatting(diff, format);
  return formatedDiff;
};

export default parser;
