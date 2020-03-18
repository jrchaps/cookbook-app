import React from 'react';
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
  margin-left: 8px;
`;

const StyledOption = styled.option``;

const SubHeader = ({ recipes, setRecipes, defaultRecipes }) => {
  const handleChange = event => {
    if (event.target.value == 2) {
      setRecipes(
        recipes.slice().sort((a, b) => b.recipe.calories - a.recipe.calories),
      );
    } else if (event.target.value == 1) {
      setRecipes(
        recipes.slice().sort((a, b) => a.recipe.calories - b.recipe.calories),
      );
    } else {
      setRecipes(defaultRecipes);
    }
  };

  return (
    <Container>
      <Label htmlFor='filter'>Sort By:</Label>
      <StyledSelect id='filter' onChange={handleChange}>
        <StyledOption value={0}>Search</StyledOption>
        <StyledOption value={1}>Lowest Calories</StyledOption>
        <StyledOption value={2}>Highest Calories</StyledOption>
      </StyledSelect>
    </Container>
  );
};

export default SubHeader;
