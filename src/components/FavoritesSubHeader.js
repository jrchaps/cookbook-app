import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 32px;
`;

const Label = styled.label`
  margin: auto 0px;
`;

const StyledSelect = styled.select`
  margin: auto 32px;
`;

const StyledOption = styled.option``;

const FavoritesSubHeader = ({ recipes, setRecipes, defaultRecipes }) => {
  const handleChange = event => {
    if (event.target.value == 3) {
      setRecipes(
        recipes
          .slice()
          .sort((a, b) => a[1].recipe.label.localeCompare(b[1].recipe.label)),
      );
    } else if (event.target.value == 2) {
      setRecipes(
        recipes
          .slice()
          .sort((a, b) => b[1].recipe.calories - a[1].recipe.calories),
      );
    } else if (event.target.value == 1) {
      setRecipes(
        recipes
          .slice()
          .sort((a, b) => a[1].recipe.calories - b[1].recipe.calories),
      );
    } else {
      setRecipes(defaultRecipes);
    }
  };

  return (
    <Container>
      <Label htmlFor='filter'>Sort By:</Label>
      <StyledSelect id='filter' onChange={handleChange}>
        <StyledOption value={0}>Recently Added</StyledOption>
        <StyledOption value={1}>Lowest Calories</StyledOption>
        <StyledOption value={2}>Highest Calories</StyledOption>
        <StyledOption value={3}>Alphabetical</StyledOption>
      </StyledSelect>
    </Container>
  );
};

export default FavoritesSubHeader;
