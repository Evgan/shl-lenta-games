import React from 'react';
import logo from './logo.svg';
import Lenta from './components/lenta/Lenta';

const App: React.FC = () => {
  return (
      <div>
        <Lenta testLenta="test Lenta" />
      </div>

  );
}

export default App;
