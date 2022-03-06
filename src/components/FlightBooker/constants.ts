export const enum FlightTypes {
  OneWay = 'one-way',
  Return = 'return',
}

export const flightTypeOptions = [
  { value: FlightTypes.OneWay, label: 'one-way flight' },
  { value: FlightTypes.Return, label: 'return flight' },
];

export const datePattern =
  '^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$';
