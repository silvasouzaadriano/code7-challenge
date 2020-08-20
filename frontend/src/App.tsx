import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './context';
import Header from './components/Header';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <>
      <BrowserRouter>
        <AppProvider>
          <Header />
        </AppProvider>
      </BrowserRouter>
      <GlobalStyle />
    </>
  </>
);

export default App;
