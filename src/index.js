import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './config/web3';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const appSW = registerServiceWorker()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Web3ReactProvider getLibrary={getLibrary}>
          <App appServiceWorker={appSW} />
      </Web3ReactProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
