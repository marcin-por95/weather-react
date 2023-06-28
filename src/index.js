import React from 'react';

import App from './App';

import './styles/normalize.scss';
import './styles/global.scss';
import 'font-awesome/css/font-awesome.min.css';
import {createRoot} from "react-dom/client";

const rootElement = document.querySelector('#root');

createRoot(rootElement).render(
            <App />
);