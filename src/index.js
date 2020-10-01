import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { createStore } from 'redux'
// import rootReducer from "./store/reducer"
import { Provider } from "react-redux"
import { Firebase, FirebaseContext } from "./config/firebase"
import { store, persistor } from "./store"
import { PersistGate } from 'redux-persist/integration/react';

// const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirebaseContext.Provider value={new Firebase()}>
        <App />
        </FirebaseContext.Provider>
      </PersistGate>      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

