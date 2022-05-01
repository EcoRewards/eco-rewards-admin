import React from 'react';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import "startbootstrap-sb-admin-2/css/sb-admin-2.min.css"
import "startbootstrap-sb-admin-2/vendor/fontawesome-free/css/all.min.css"

import { createRoot } from "react-dom/client";
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
