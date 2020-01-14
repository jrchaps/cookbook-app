import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/actions';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 768px) {
    width: calc(100% / 2 - 64px);
    margin-bottom: 16px;
  }
  @media (min-width: 1440px) {
    width: calc(100% / 3 - 64px);
  }
  @media (min-width: 2560px) {
    width: calc(100% / 4 - 64px);
  }
  margin: 16px 16px 0px 16px;
  &:nth-last-child(1) {
    margin-bottom: 16px;
  }
  padding: 16px;
  background: white;
  box-shadow: ${props => props.theme.shadow};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin: 6px 0px;
  font-weight: normal;
  color: ${props => props.theme.black.dark};
`;

const Subtitle = styled.h3`
  margin: 6px 0px;
  font-weight: normal;
  color: ${props => props.theme.black.dark};
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
  @media (min-width: 768px) {
    height: 200px;
    width: 200px;
  }
  margin-bottom: 24px;
  border-radius: 20px;
`;

const RecipeCard = props => {
  return (
    <Card>
      <TextContainer>
        <Title>{props.recipe.recipe.label}</Title>
        <Subtitle>Calories: {Math.ceil(props.recipe.recipe.calories)}</Subtitle>
      </TextContainer>
      <FavoriteButton props={props} />
      <ImageContainer>
        <Image
          src={props.recipe.recipe.image}
          alt={props.recipe.recipe.label}
        ></Image>
      </ImageContainer>
      <Ingredients props={props} />
    </Card>
  );
};

export default RecipeCard;

const StyledFavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 56px;
  margin: 6px 0px;
  padding: 0px;
  cursor: pointer;
  user-select: none;
  background: none;
  &:hover {
    background: rgba(255, 138, 101, 0.3);
  }
  border: none;
  border-radius: 100%;
  transition: background 0.2s ${props => props.theme.transitionTimingFunction};
`;

const FavoriteBorderIcon = styled.i`
  font-size: 36px;
  color: ${props => props.theme.black.medium};
`;

const FavoriteIcon = styled(FavoriteBorderIcon)`
  color: ${props => props.theme.color.secondary.main};
`;

const FavoriteButton = props => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const [checked, setChecked] = useState(
    favorites[props.props.recipe.recipe.uri] ? true : false,
  );

  const toggleFavorite = e => {
    if (checked) {
      dispatch(removeFavorite(props.props.recipe.recipe.uri));
    } else {
      dispatch(addFavorite(props.props.recipe));
    }
    setChecked(!checked);
  };

  const handleButtonMouseDown = e => {
    e.preventDefault();
  };

  return (
    <StyledFavoriteButton
      type='button'
      aria-label='toggle favorite'
      onClick={toggleFavorite}
      onMouseDown={handleButtonMouseDown}
    >
      {favorites[props.props.recipe.recipe.uri] ? (
        <FavoriteIcon className='material-icons'>favorite</FavoriteIcon>
      ) : (
        <FavoriteBorderIcon className='material-icons'>
          favorite_border
        </FavoriteBorderIcon>
      )}
    </StyledFavoriteButton>
  );
};

const IngredientsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 175px;
  padding: 10px 20px;

  margin: auto;
  margin-bottom: 16px;
  font-weight: bold;
  user-select: none;
  background: ${props => props.theme.color.primary.main};
  &:hover {
    background: ${props => props.theme.color.primary.dark};
  }
  color: ${props => props.theme.black.dark};
  border: none;
  border-radius: 25px;
  box-shadow: ${props => props.theme.shadow};
  &:active {
    box-shadow: ${props => props.theme.shadow} inset;
  }
  transition: background 0.2s ${props => props.theme.transitionTimingFunction};
`;

const IngredientsButtonIcon = styled.i`
  color: ${props => props.theme.black.dark};
  transform: ${props => (props.up ? 'rotate(-180deg)' : 'none')};
  transition: transform 0.3s ${props => props.theme.transitionTimingFunction};
`;

const IngredientList = styled.ul`
  height: ${props => props.height};
  width: 100%;
  padding: 0px 8px;
  margin: 0px;
  box-sizing: border-box;
  overflow: hidden;
  list-style-type: none;
  transition: height 0.3s ${props => props.theme.transitionTimingFunction};
`;

const ListItem = styled.li`
  padding: 8px 16px;
`;

const Divider = styled.hr`
  color: ${props => props.theme.black.light};
  border-style: solid;
`;

const Ingredients = props => {
  const [listHeight, setListHeight] = useState('0px');
  const listRef = useRef();

  const toggleIngredients = e => {
    e.preventDefault();
    if (listHeight === '0px') {
      setListHeight(listRef.current.scrollHeight + 'px');
      setTimeout(() => {
        setListHeight('auto');
      }, 300);
    } else {
      setListHeight(listRef.current.scrollHeight + 'px');
      setTimeout(() => {
        setListHeight('0px');
      });
    }
  };

  const handleButtonMouseDown = e => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <IngredientsButton
        onClick={toggleIngredients}
        onMouseDown={handleButtonMouseDown}
      >
        INGREDIENTS
        <IngredientsButtonIcon
          className='material-icons'
          up={listHeight !== '0px'}
        >
          keyboard_arrow_down
        </IngredientsButtonIcon>
      </IngredientsButton>
      <IngredientList ref={listRef} height={listHeight}>
        <Divider></Divider>
        {props.props.recipe.recipe.ingredientLines.map((ingredient, i) => (
          <React.Fragment key={i}>
            <ListItem>{ingredient}</ListItem>
            <Divider></Divider>
          </React.Fragment>
        ))}
      </IngredientList>
    </React.Fragment>
  );
};
