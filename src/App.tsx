import React from 'react';
import configureStore, {history} from './configureStore';
import Lenta from './components/lenta/Lenta';
import {Provider} from "react-redux";
const store = configureStore();


const App: React.FC = () => {
  return (
      <div>
          <Provider store={store}>
              <Lenta testLenta="test Lenta" />
          </Provider>
      </div>

  );
}

export default App;
