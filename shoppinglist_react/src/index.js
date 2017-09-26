import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

let Lists = [];

ReactDOM.render(<App initialLists={Lists}/>, document.getElementById('root'));

