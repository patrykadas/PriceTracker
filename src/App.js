import React from 'react';
import TokensList from './components/TokensList/TokensList';
import {
  initialCurrency,
  initialCryptoCurrencies,
  availableTokens,
} from './config';

const path = window.location.pathname.substring(1).toUpperCase();

const validateTokensList = (path) => {
  const list = new Set();
  const urlList = path.split('-');
  const tokensList = Object.keys(availableTokens);
  for (let i = 0; i <= tokensList.length; i++) {
    if (tokensList.includes(urlList[i])) {
      list.add(urlList[i]);
    }
  }
  return list.size ? Array.from(list).splice(0, 5) : initialCryptoCurrencies;
};

function App() {
  return (
    <TokensList
      initialCurrency={initialCurrency}
      initialCryptoCurrencies={
        path ? validateTokensList(path) : initialCryptoCurrencies
      }
    />
  );
}

export default App;
