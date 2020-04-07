import React, { useState, useEffect } from 'react';
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

const Select = ({ setRecipes, fetchedRecipes }) => {
  const [option, setOption] = useState(0);

  useEffect(() => {
    switch (option) {
      case '3':
        setRecipes(
          fetchedRecipes
            .slice()
            .sort((a, b) => a.recipe.label.localeCompare(b.recipe.label)),
        );
        break;
      case '2':
        setRecipes(
          fetchedRecipes
            .slice()
            .sort((a, b) => b.recipe.calories - a.recipe.calories),
        );
        break;
      case '1':
        setRecipes(
          fetchedRecipes
            .slice()
            .sort((a, b) => a.recipe.calories - b.recipe.calories),
        );
        break;
      default:
        setRecipes(fetchedRecipes);
    }
  }, [setRecipes, fetchedRecipes, option]);

  const handleChange = event => {
    setOption(event.target.value);
  };

  return (
    <Container>
      <Label htmlFor='filter'>Sort By:</Label>
      <StyledSelect id='filter' onChange={handleChange}>
        <StyledOption value='0'>Search</StyledOption>
        <StyledOption value='1'>Lowest Calories</StyledOption>
        <StyledOption value='2'>Highest Calories</StyledOption>
        <StyledOption value='3'>Alphabetical</StyledOption>
      </StyledSelect>
    </Container>
  );
};

export default Select;
