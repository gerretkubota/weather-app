import React from 'react';

import MainContainer from './components/MainContainer';
import Card from './components/Card';

const App = () => (
  <div>
    <MainContainer>
      {[1, 2, 3].map((_) => (
        <Card key={_} />
      ))}
    </MainContainer>
  </div>
);

export default App;
