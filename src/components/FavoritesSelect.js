import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 32px;
`;

const Label = styled.label`
  color: ${props => props.theme.black.dark};
  margin: auto 0px;
`;

const StyledSelect = styled.select`
  margin: auto 32px;
  margin-left: 8px;
  color: ${props => props.theme.black.dark};
`;

const StyledOption = styled.option``;

const FavoritesSelect = ({ favorites, setRecipes }) => {
  const [option, setOption] = useState();

  useLayoutEffect(() => {
    switch (option) {
      case '3':
        setRecipes(
          Object.entries(favorites)
            .slice()
            .sort((a, b) => a[1].recipe.label.localeCompare(b[1].recipe.label)),
        );
        break;
      case '2':
        setRecipes(
          Object.entries(favorites)
            .slice()
            .sort((a, b) => b[1].recipe.calories - a[1].recipe.calories),
        );
        break;
      case '1':
        setRecipes(
          Object.entries(favorites)
            .slice()
            .sort((a, b) => a[1].recipe.calories - b[1].recipe.calories),
        );
        break;
      default:
        setRecipes(Object.entries(favorites));
    }
  }, [setRecipes, favorites, option]);

  const handleChange = event => {
    setOption(event.target.value);
  };

  return (
    <Container>
      <Label htmlFor='filter'>Sort By:</Label>
      <StyledSelect id='filter' onChange={handleChange}>
        <StyledOption value='0'>Recently Added</StyledOption>
        <StyledOption value='1'>Lowest Calories</StyledOption>
        <StyledOption value='2'>Highest Calories</StyledOption>
        <StyledOption value='3'>Alphabetical</StyledOption>
      </StyledSelect>
    </Container>
  );
};

export default FavoritesSelect;
