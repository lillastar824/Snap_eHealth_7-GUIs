import { CellState } from './types';

const oparationByName: Record<string, (vals: number[]) => number> = {
  add: (values: number[]): number => values[0] + values[1],
  sub: (values: number[]): number => values[0] - values[1],
  div: (values: number[]): number => values[0] / values[1],
  mul: (values: number[]): number => values[0] * values[1],
  mod: (values: number[]): number => values[0] % values[1],
  sum: (values: number[]): number =>
    values.reduce((prev, currentValue) => prev + currentValue, 0),
  prod: (values: number[]): number =>
    values.reduce((prev, currentValue) => prev * currentValue, 1),
};

export const getArrayIds = (startId: string, endId: string): string[] => {
  return [startId, endId];
};

export const getIdFromParts = (letter: string, number: string): string =>
  `${letter}_${number}`;

export const getPartsFromId = (id: string): string[] => id.split('_');

export const operateValue = (state: CellState, value: string): string => {
  if (!value.includes('(')) {
    const cellId = value.replace('=', '');

    const cellValue =
      Object.values(state).find(
        (cellData) => cellData.id.replace('_', '') === cellId,
      )?.value || '';

    return cellValue;
  }

  const stringWithoutEqualsSign = value.replace('=', '').replace(')', '');
  const [operationName, idsString] = stringWithoutEqualsSign.split('(');

  const operation = oparationByName[operationName] || null;

  if (!operation) {
    return value;
  }

  if (idsString.includes(',') || idsString.includes(':')) {
    const slitSymbol = idsString.includes(',') ? ',' : ':';
    const [part1, part2] = idsString.split(slitSymbol);

    const value1 = isNaN(Number(part1))
      ? Object.values(state).find(
          (cellData) => cellData.id.replace('_', '') === part1,
        )?.value || ''
      : part1;

    const value2 = isNaN(Number(part2))
      ? Object.values(state).find(
          (cellData) => cellData.id.replace('_', '') === part2,
        )?.value || ''
      : part2;

    return String(operation([Number(value1), Number(value2)]));
  }

  if (idsString.includes(':')) {
    return value;
  }

  return value;
};
