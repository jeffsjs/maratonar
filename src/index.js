import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import Routes from './routes';
import Store  from './store'
import './styles/app.css'

ReactDOM.render(
  <Provider store={Store}>
    
    <div className='main'>
      <div className='container'>
        <Routes />
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);
