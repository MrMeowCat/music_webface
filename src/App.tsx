import 'App.css';
import * as React from 'react';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRouter } from 'router';
import { store } from 'store';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <AppRouter/>
        </Provider>
        <ToastContainer autoClose={3000}
                        hideProgressBar={true}
                        className={'toast'}
                        position={toast.POSITION.TOP_RIGHT}/>
      </React.Fragment>
    );
  }
}

export default App;
