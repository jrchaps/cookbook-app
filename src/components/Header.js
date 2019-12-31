import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { useHistory, NavLink } from 'react-router-dom';
import { fetchRecipes } from '../store/actions';
import { useDispatch } from 'react-redux';

const FixedHeader = styled.div`
  position: fixed;
  width: 100%;
  top: ${props => (props.isHidden ? '-80px' : '0px')};
  transition: top 0.3s ease-out;
`;

const HeaderContainer = styled.header`
  display: flex;
  padding: 0px 50px;
  background: #ffcc80;
  box-shadow: 0px 0px 10px 0px grey;
  height: 64px;
  transition: bottom 0.3s ease-out;
`;

const Nav = styled.nav`
  display: flex;
  flex-grow: 1;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 30px;
  color: black;
  font-weight: bolder;
  padding: 0px 20px;
  opacity: 0.6;
  font-family: Roboto;
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 0.8;
    &:active {
      opacity: 1;
    }
  }
  &.active {
    opacity: 1;
    border-bottom: 4px solid black;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-self: center;
  width: 400px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.7);
`;

const SearchFormButton = styled.button`
  display: flex;
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const SearchInput = styled.input`
  font-family: Roboto;
  outline: none;
  border: none;
  background: none;
  padding: 8px;
  width: 100%;
`;

const Header = () => {
  const [query, setQuery] = useState('');
  const [scrollPos, setScrollPos] = useState(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.onscroll = () => {
      document.documentElement.scrollTop > scrollPos
        ? setIsHeaderHidden(true)
        : setIsHeaderHidden(false);
      setScrollPos(document.documentElement.scrollTop);
    };
  });

  const handleSubmit = e => {
    e.preventDefault();
    history.push('/');
    dispatch(fetchRecipes(query));
  };

  const handleReset = e => {
    setQuery('');
  };

  const handleButtonClick = e => {
    e.preventDefault();
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  return (
    <FixedHeader isHidden={isHeaderHidden}>
      <HeaderContainer>
        <Nav>
          <StyledNavLink exact to='/'>
            Home
          </StyledNavLink>
          <StyledNavLink to='favorites'>Favorites</StyledNavLink>
        </Nav>
        <SearchForm
          onSubmit={handleSubmit}
          onReset={handleReset}
          className='search-form'
        >
          <SearchFormButton type='submit' onMouseDown={handleButtonClick}>
            <i className='material-icons'>search</i>
          </SearchFormButton>
          <SearchInput
            placeholder='Search for recipes...'
            value={query}
            onChange={handleInputChange}
          />
          {query && (
            <SearchFormButton type='reset' onMouseDown={handleButtonClick}>
              <i className='material-icons'>clear</i>
            </SearchFormButton>
          )}
        </SearchForm>
      </HeaderContainer>
    </FixedHeader>
  );
};

export default Header;
