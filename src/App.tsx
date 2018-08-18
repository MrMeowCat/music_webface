import * as React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from 'router';
import { store } from 'store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    );
  }
}

export default App;
