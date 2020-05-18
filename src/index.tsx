// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import UserForm from './components/UserForm';
import store from './Store';

const container = document.getElementById('contents');

ReactDOM.render(
  <Provider store={store}>
    <UserForm />
  </Provider>,
  container,
);
