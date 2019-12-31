import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/actions';

const Card = styled.div`
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px grey;
  align-items: center;
  background: white;
  margin: 40px;
  width: 100%;
`;

const Title = styled.h2``;

const Subtitle = styled.h4``;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 100%;
  transition: background 0.3s ease-out;
  &:hover {
    background: rgba(255, 138, 101, 0.2);
  }
  &:focus {
    background: rgba(255, 138, 101, 0.2);
  }
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const FavoriteBorderIcon = styled.i`
  font-size: 36px;
`;

const FavoriteIcon = styled(FavoriteBorderIcon)`
  color: #ff8a65;
`;

const IngredientsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
`;

const IngredientsButtonIcon = styled.i``;

const IngredientList = styled.ul`
  height: ${props => props.height};
  overflow: hidden;
  padding: 0px 32px;
  list-style-type: none;
  transition: height 0.3s ease-out;
`;

const ListItem = styled.li`
  padding: 8px 16px;
`;

const Divider = styled.hr``;

const RecipeCard = props => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const [listHeight, setListHeight] = useState('0px');
  const listRef = useRef();

  const toggleFavorite = e => {
    e.target.checked
      ? dispatch(addFavorite(props.recipe))
      : dispatch(removeFavorite(props.recipe.recipe.uri));
  };

  const toggleIngredients = e => {
    if (listHeight === '0px') {
      setListHeight(listRef.current.scrollHeight + 'px');
      setTimeout(() => {
        setListHeight('auto');
      }, 400);
    } else {
      setListHeight(listRef.current.scrollHeight + 'px');
      setTimeout(() => {
        setListHeight('0px');
      });
    }
  };

  return (
    <Card>
      <Title>{props.recipe.recipe.label}</Title>
      <Subtitle>Calories: {Math.ceil(props.recipe.recipe.calories)}</Subtitle>
      <CheckboxLabel>
        <Checkbox
          type='checkbox'
          onChange={toggleFavorite}
          checked={favorites[props.recipe.recipe.uri] ? true : false}
        ></Checkbox>
        {favorites[props.recipe.recipe.uri] ? (
          <FavoriteIcon className='material-icons'>favorite</FavoriteIcon>
        ) : (
          <FavoriteBorderIcon className='material-icons'>
            favorite_border
          </FavoriteBorderIcon>
        )}
      </CheckboxLabel>
      <img
        src={props.recipe.recipe.image}
        alt={props.recipe.recipe.label}
      ></img>
      <IngredientsButton type='button' onClick={toggleIngredients}>
        hello
        <IngredientsButtonIcon className='material-icons'>
          keyboard_arrow_down
        </IngredientsButtonIcon>
      </IngredientsButton>
      <IngredientList ref={listRef} height={listHeight}>
        <Divider></Divider>
        {props.recipe.recipe.ingredientLines.map((ingredient, i) => (
          <React.Fragment key={i}>
            <ListItem>{ingredient}</ListItem>
            <Divider></Divider>
          </React.Fragment>
        ))}
      </IngredientList>
    </Card>
  );
};

export default RecipeCard;
