import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { HomePage, FavoritesPage, SearchPage } from './Pages';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Route>
        <Header />
      </Route>
      <Switch>
        <Route exact path='/favorites'>
          <FavoritesPage />
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/search'>
          <SearchPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
