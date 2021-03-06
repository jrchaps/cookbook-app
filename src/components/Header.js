import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/actions';
import styled from 'styled-components/macro';
import { useHistory, useLocation, NavLink } from 'react-router-dom';

const HeaderBar = styled.header`
  position: fixed;
  display: flex;
  height: 64px;
  width: 100%;
  padding: 0px 50px;
  box-sizing: border-box;
  z-index: 1;
  background: ${props => props.theme.color.primary.main};
  box-shadow: ${props => props.theme.shadow};
  transform: ${props =>
    props.isHidden ? 'translateY(-70px)' : 'translateY(0)'};
  @media (max-width: 768px) {
    flex-wrap: wrap;
    height: auto;
    transform: ${props =>
      props.isHidden ? 'translateY(-48px)' : 'translateY(0)'};
    padding: 0px 16px;
  }
  transition: transform 0.3s ${props => props.theme.transitionTimingFunction};
`;

const Header = () => {
  const scrollPosition = useRef(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      document.documentElement.scrollTop > scrollPosition.current
        ? setIsHeaderHidden(true)
        : setIsHeaderHidden(false);
      scrollPosition.current = document.documentElement.scrollTop;
    };
  });

  return (
    <HeaderBar isHidden={isHeaderHidden}>
      <Nav />
      <SearchForm />
    </HeaderBar>
  );
};

export default Header;

const StyledNav = styled.nav`
  display: flex;
  flex-grow: 1;
  @media (max-width: 768px) {
    height: 56px;
    order: 1;
  }
`;

const NavTab = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 30px;
  @media (max-width: 768px) {
    flex-grow: 1;
    margin: 0px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0px 20px;
  text-decoration: none;
  color: ${props => props.theme.black.medium};
  font-weight: bolder;
  &:hover {
    color: ${props => props.theme.black.dark};
  }
  &.active {
    color: ${props => props.theme.black.dark};
  }
  transition: color 0.2s ${props => props.theme.transitionTimingFunction};
`;

const NavIndicator = styled.div`
  position: absolute;
  align-self: flex-end;
  width: 100%;
  height: 4px;
  background: ${props => props.theme.black.dark};
  transform: ${props => (props.active ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: bottom;
  transition: transform 0.3s ${props => props.theme.transitionTimingFunction};
`;

const Nav = () => {
  const location = useLocation();

  return (
    <StyledNav>
      <NavTab>
        <StyledNavLink exact to='/'>
          Home
        </StyledNavLink>
        <NavIndicator active={location.pathname === '/'} />
      </NavTab>
      <NavTab>
        <StyledNavLink to='favorites'>Favorites</StyledNavLink>
        <NavIndicator active={location.pathname === '/favorites'} />
      </NavTab>
    </StyledNav>
  );
};

const SearchFormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  @media (max-width: 768px) {
    height: 48px;
    width: 100%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
`;

const SearchFormButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background: none;
  border: none;
  color: ${props => props.theme.black.medium};
  &:hover {
    color: ${props => props.theme.black.dark};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  outline: none;
  background: none;
  border: none;
  color: ${props => props.theme.black.dark};
`;

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if (search) {
      let query = search.split('=')[1];
      query = query.split('%20');
      query = query.join(' ');
      setQuery(query);
      dispatch(fetchRecipes(query));
    }
  }, [search, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/search?=${query}`);
    dispatch(fetchRecipes(query));
  };

  const handleReset = () => {
    setQuery('');
    inputRef.current.focus();
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };
  return (
    <SearchFormContainer>
      <StyledForm
        onSubmit={handleSubmit}
        onReset={handleReset}
        className='search-form'
      >
        <SearchFormButton type='submit' onMouseDown={e => e.preventDefault()}>
          <i className='material-icons'>search</i>
        </SearchFormButton>
        <SearchInput
          placeholder='Search for recipes...'
          value={query}
          onChange={handleInputChange}
          ref={inputRef}
        />
        {query && (
          <SearchFormButton type='reset' onMouseDown={e => e.preventDefault()}>
            <i className='material-icons'>clear</i>
          </SearchFormButton>
        )}
      </StyledForm>
    </SearchFormContainer>
  );
};
