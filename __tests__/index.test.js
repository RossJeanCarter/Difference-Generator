import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import parser from '../src/index.js';

const __filename = new URL(import.meta.url).pathname;
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');

const resultPathStylish = getFixturePath('result_stylish.txt');
const resultPathPlain = getFixturePath('result_plain.txt');
const resultPathJson = getFixturePath('result_json.txt');

describe('File Comparison', () => {
  const formats = [
    { name: 'Stylish Format', format: 'stylish', resultPath: resultPathStylish },
    { name: 'Plain Format', format: 'plain', resultPath: resultPathPlain },
    { name: 'JSON Format', format: 'json', resultPath: resultPathJson },
  ];

  formats.forEach(({ name, format, resultPath }) => {
    const result = readFileSync(resultPath, 'utf-8');

    describe(`${name}`, () => {
      test.each([
        ['file.json', jsonFile1, jsonFile2],
        ['file.yaml', ymlFile1, ymlFile2],
      ])(`%s`, (fileName, file1, file2) => {
        expect(parser(file1, file2, format)).toBe(result);
      });
    });
  });
});
