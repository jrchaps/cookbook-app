import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import RecipeCard from './components/RecipeCard';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding-top: 64px;
  @media (max-width: 768px) {
    padding-top: 104px;
  }
`;

const HomePage = () => {
  const recipes = useSelector(state => state.fetchedRecipes);

  return (
    <MainDiv>
      {recipes.map((recipe, i) => (
        <RecipeCard recipe={recipe} i={i} key={i} />
      ))}
    </MainDiv>
  );
};

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);

  return (
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
