import AppRouter from './AppRouter';
import { Reset } from 'styled-reset';
import styled, { createGlobalStyle } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,300&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: '300';
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
