import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 64px;
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

export default HomePage;
