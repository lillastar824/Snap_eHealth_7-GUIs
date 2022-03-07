import { FormulaResolver, OperationResolver, Operation } from './types';

const oparationByName: Record<string, Operation> = {
  add(values) {
    return values[0] + values[1];
  },
  sub(values) {
    return values[0] - values[1];
  },
  div(values) {
    return values[0] / values[1];
  },
  mul(values) {
    return values[0] * values[1];
  },
  mod(values) {
    return values[0] % values[1];
  },
  sum(values) {
    return values.reduce((prev, currentValue) => prev + currentValue, 0);
  },
  prod(values) {
    return values.reduce((prev, currentValue) => prev * currentValue, 1);
  },
};

export const getArrayIds = (startId: string, endId: string): string[] => {
  return [startId, endId];
};

export const getIdFromParts = (letter: string, number: string): string =>
  `${letter}_${number}`;

export const getPartsFromId = (id: string): string[] => id.split('_');

export const resolveLink: FormulaResolver = (state, value) => {
  const cellId = value.replace('=', '');

  const cellValue =
    Object.values(state).find(
      (cellData) => cellData.id.replace('_', '') === cellId,
    )?.value || '0';

  if (cellValue.includes('=')) {
    return resolveOperation(state, cellValue);
  }

  return cellValue;
};

export const isNumber = (value: string): boolean => !isNaN(Number(value));

const operationWithTwoCells: OperationResolver = (state, range, operation) => {
  const [part1, part2] = range.split(',');

  const value1 = isNumber(part1) ? part1 : getCellValueByName(state, part1);
  const value2 = isNumber(part2) ? part2 : getCellValueByName(state, part2);

  const cellValues = [Number(value1), Number(value2)];

  return String(operation(cellValues));
};

const operationWithRange: OperationResolver = (state, range, operation) => {
  const [part1, part2] = range.split(':');

  const numberPart1 = Number(part1.match(numberPattern)?.join('') || '');
  const stringPart1 = part1.replaceAll(numberPattern, '');

  const numberPart2 = Number(part2.match(numberPattern)?.join('') || '');
  const stringPart2 = part2.replaceAll(numberPattern, '');

  if (numberPart1 > numberPart2 || stringPart1 > stringPart2) {
    return '0';
  }

  const ids = [];

  for (
    let char = stringPart1;
    char.charCodeAt(0) <= stringPart2.charCodeAt(0);
    char = String.fromCharCode(char.charCodeAt(0) + 1)
  ) {
    for (
      let numberValue = numberPart1;
      numberValue <= numberPart2;
      numberValue++
    ) {
      ids.push(char + numberValue);
    }
  }

  const values = ids.map((id) => Number(getCellValueByName(state, id)));

  return String(operation(values));
};

const getCellValueByName: FormulaResolver = (state, value) => {
  const foundValue =
    Object.values(state).find(
      (cellData) => cellData.id.replace('_', '') === value,
    )?.value || '0';

  if (foundValue.includes('=')) {
    return resolveOperation(state, foundValue);
  }

  return foundValue;
};

const numberPattern = /\d+/g;

export const resolveOperation: FormulaResolver = (state, value) => {
  const isLink = !value.includes('(');

  if (isLink) {
    return resolveLink(state, value);
  }

  const [operationName, rangeString] = value
    .replace('=', '')
    .replace(')', '')
    .split('(');

  const operation = oparationByName[operationName.toLowerCase()] || null;

  if (!operation) {
    return value;
  }

  if (rangeString.includes(',')) {
    return operationWithTwoCells(state, rangeString, operation);
  }

  if (rangeString.includes(':')) {
    return operationWithRange(state, rangeString, operation);
  }

  return value;
};
