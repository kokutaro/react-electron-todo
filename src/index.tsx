import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import appStore from './app-store';
import { GlobalStyle, theme } from './components/FoundationStyles';
import TaskListContainer from './components/TaskList';

const container = document.getElementById('contents');

ReactDOM.render(
  <Provider store={appStore}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TaskListContainer />
    </ThemeProvider>
  </Provider>,
  container,
);
