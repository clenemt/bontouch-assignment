import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './pages/root/App';

import './assets/scss/index.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
