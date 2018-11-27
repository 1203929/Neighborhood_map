import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import serviceWorker from './serviceWorker';

ReactDOM.render(<App></App>, document.getElementById('root'));
serviceWorker();
export default serviceWorker;
