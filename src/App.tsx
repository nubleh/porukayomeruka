import * as React from 'react';

import TsukuruChart from './TsukuruChart';
import YomiChart from './YomiChart';

const App = () => {
  const hash = window.location.hash;
  return <div>
    {hash === '' && <YomiChart/>}
    {hash === '#tsukureruka' && <TsukuruChart/>}
  </div>;
};

export default App;
