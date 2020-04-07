import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from './store/actions';
import LoadingSpinner from './components/LoadingSpinner';
import RecipeCard from './components/RecipeCard';
import Select from './components/Select';
import FavoritesSelect from './components/FavoritesSelect';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-top: 64px;
  @media (max-width: 768px) {
    padding-top: 104px;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 64px);
`;

const MainMessage = styled.h2`
  text-align: center;
  font-weight: normal;
  color: ${props => props.theme.black.dark};
  padding: 16px;
  margin: auto;
`;

const foods = [
  'pie',
  'apple',
  'chicken',
  'steak',
  'burger',
  'taco',
  'sushi',
  'soup',
  'curry',
  'pizza',
];

const HomePage = () => {
  const isFetchingState = useSelector(state => state.isFetching);
  const networkErrorState = useSelector(state => state.networkError);
  const fetchedRecipes = useSelector(state => state.fetchedRecipes);
  const [recipes, setRecipes] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const randomFood = foods[Math.floor(Math.random() * 10)];
    dispatch(fetchRecipes(randomFood));
  }, [dispatch]);

  return isFetchingState ? (
    <MainDiv>
      <LoadingSpinner />
    </MainDiv>
  ) : networkErrorState ? (
    <MainDiv>
      <Container>
        <MainMessage>There was a network error, Try again later.</MainMessage>
      </Container>
    </MainDiv>
  ) : typeof recipes[0] === 'string' ? (
    <MainDiv>
      <Container>
        <MainMessage>
          Sorry, no results were found after searching for {recipes[0]}.
        </MainMessage>
      </Container>
    </MainDiv>
  ) : (
    <MainDiv>
      <Select setRecipes={setRecipes} fetchedRecipes={fetchedRecipes} />
      {recipes.map((recipe, i) => (
        <RecipeCard recipe={recipe} i={i} key={i} />
      ))}
    </MainDiv>
  );
};

const SearchPage = () => {
  const isFetching = useSelector(state => state.isFetching);
  const networkError = useSelector(state => state.networkError);
  const fetchedRecipes = useSelector(state => state.fetchedRecipes);
  const [recipes, setRecipes] = useState(fetchedRecipes);

  return isFetching ? (
    <MainDiv>
      <LoadingSpinner />
    </MainDiv>
  ) : networkError ? (
    <MainDiv>
      <Container>
        <MainMessage>There was a network error, Try again later.</MainMessage>
      </Container>
    </MainDiv>
  ) : typeof recipes[0] === 'string' ? (
    <MainDiv>
      <MainMessage>
        Sorry, no results were found after searching for {recipes[0]}.
      </MainMessage>
    </MainDiv>
  ) : (
    <MainDiv>
      <Select setRecipes={setRecipes} fetchedRecipes={fetchedRecipes} />
      {recipes.map((recipe, i) => (
        <RecipeCard recipe={recipe} i={i} key={i} />
      ))}
    </MainDiv>
  );
};

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);
  const [recipes, setRecipes] = useState(Object.entries(favorites));

  return Object.keys(favorites).length === 0 ? (
    <MainDiv>
      <Container>
        <MainMessage>You have no favorite recipes.</MainMessage>
      </Container>
    </MainDiv>
  ) : (
    <MainDiv>
      <FavoritesSelect favorites={favorites} setRecipes={setRecipes} />
      {recipes.map((recipe, i) => (
        <RecipeCard recipe={recipe[1]} key={i} />
      ))}
    </MainDiv>
  );
};

export { HomePage, FavoritesPage, SearchPage };
