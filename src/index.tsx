import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import ThemeProvider from './ThemeProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
