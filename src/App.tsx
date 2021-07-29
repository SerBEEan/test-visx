import React from 'react';
import './App.css';

import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';

function App() {
  return (
      <>
        {new Array(30).fill(0).map((_, it) => (
            <div className="chart">
              <span>{ it }</span>
              <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>
            </div>
        ))}
      </>
  );
}

export default App;
