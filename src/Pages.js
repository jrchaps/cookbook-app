import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/LoadingSpinner';
import RecipeCard from './components/RecipeCard';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  height: calc(100vh - 64px);
  @media (max-width: 768px) {
    height: calc(100vh - 104px);
  }
  padding-top: 64px;
  @media (max-width: 768px) {
    padding-top: 104px;
  }
`;

const MainMessage = styled.h2`
  text-align: center;
  font-weight: normal;
  color: ${props => props.theme.black.dark};
  padding: 16px;
  margin: auto;
`;

const HomePage = () => {
  const isFetching = useSelector(state => state.isFetching);
  const networkError = useSelector(state => state.networkError);
  const recipes = useSelector(state => state.fetchedRecipes);

  return isFetching ? (
    <MainDiv>
      <LoadingSpinner />
    </MainDiv>
  ) : networkError ? (
    <MainDiv>
      <MainMessage>There was a network error, Try again later.</MainMessage>
    </MainDiv>
  ) : typeof recipes[0] === 'string' ? (
    <MainDiv>
      <MainMessage>
        Sorry, no results were found after searching for {recipes[0]}.
      </MainMessage>
    </MainDiv>
  ) : (
    <MainDiv>
      {recipes.map((recipe, i) => (
        <RecipeCard recipe={recipe} i={i} key={i} />
      ))}
    </MainDiv>
  );
};

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);

  return Object.keys(favorites).length === 0 ? (
    <MainDiv>
      <MainMessage>You have no favorite recipes.</MainMessage>
    </MainDiv>
  ) : (
    <MainDiv>
      {Object.keys(favorites)
        .map(uri => favorites[uri])
        .map((recipe, i) => (
          <RecipeCard recipe={recipe} key={i} />
        ))}
    </MainDiv>
  );
};

export { HomePage, FavoritesPage };
