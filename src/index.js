import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store,persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8800/api/'
axios.defaults.withCredentials = true;
axios.defaults.headers.common['mode']='cors'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
