import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 64px;
`;

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

export default FavoritesPage;
