import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  return (
    <BrowserRouter>
      <Route path='/' component={Header} />
      <Route exact path='/' component={HomePage} />
      <Route path='/favorites' component={FavoritesPage} />
    </BrowserRouter>
  );
};

export default App;
