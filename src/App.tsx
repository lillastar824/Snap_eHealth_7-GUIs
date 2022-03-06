import React from 'react';

import { Counter } from 'components/Counter';
import { Converter } from 'components/Converter';
import { FlightBooker } from 'components/FlightBooker';
import { Crud } from 'components/Crud';
import { Timer } from 'components/Timer';
import { Cells } from 'components/Cells';
import { CircleDrawer } from 'components/CircleDrawer';

function App(): JSX.Element {
  return (
    <div>
      <Counter />
      <Converter />
      <FlightBooker />
      <Crud />
      <Timer />
      <Cells />
      <CircleDrawer />
    </div>
  );
}

export default App;
