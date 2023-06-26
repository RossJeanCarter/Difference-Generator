import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  const jsonFile1 = getFixturePath('file1.json');
  const jsonFile2 = getFixturePath('file2.json');
  const ymlFile1 = getFixturePath('file1.yml');
  const ymlFile2 = getFixturePath('file2.yml');

  const resultPathStylish = getFixturePath('result_stylish.txt');
  const resultPathPlain = getFixturePath('result_plain.txt');
  const resultPathJson = getFixturePath('result_json.txt');

describe('Stylish Format', () => {
   const result = readFileSync(resultPathStylish, 'utf-8');

  test('file.json', () => {
    expect(parser(jsonFile1, jsonFile2)).toBe(result);
  });
  
  test('file.yaml', () => {
    expect(parser(ymlFile1, ymlFile2)).toBe(result);
  });
})

describe('Plain Format', () => {
    const result = readFileSync(resultPathPlain, 'utf-8');

  test('file.json', () => {
    expect(parser(jsonFile1, jsonFile2, 'plain')).toBe(result);
  });
  
  test('file.yaml', () => {
    expect(parser(ymlFile1, ymlFile2, 'plain')).toBe(result);
  });
})

describe('JSON Format', () => {
    const result = readFileSync(resultPathJson, 'utf-8');

  test('file.json', () => {
    expect(parser(jsonFile1, jsonFile2, 'json')).toBe(result);
  });
  
  test('file.yml', () => {
    expect(parser(ymlFile1, ymlFile2, 'json')).toBe(result);
  });
})


