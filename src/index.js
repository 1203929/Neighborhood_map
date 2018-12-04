import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import registerServiceWorker from './registerserviceWorker';

ReactDOM.render(<App></App>, document.getElementById('root'));
registerServiceWorker();
