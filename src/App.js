import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from './store/actions';
import Header from './components/Header';
import { HomePage, FavoritesPage } from './Pages';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/*const SendRequest = () => {
const {search} = useLocation()
const dispatch = useDispatch();
  useEffect(() => {
dispatch(fetchRecipes(search))
  }, [search]);
};*/

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
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
