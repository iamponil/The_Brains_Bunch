import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Modal from 'react-modal';
import { ProSidebarProvider } from 'react-pro-sidebar';

Modal.setAppElement('#root');

ReactDOM.render(
  <ProSidebarProvider>
    <App />
  </ProSidebarProvider>,
  document.getElementById('root')
);
