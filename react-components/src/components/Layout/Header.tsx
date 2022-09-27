import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <NavbarContainer>
        <NaigaitionItem to="/" end>
          Home
        </NaigaitionItem>
        <NaigaitionItem to="/about">About</NaigaitionItem>
      </NavbarContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  background-color: var(--header-background);
  height: 10vh;
`;

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const NaigaitionItem = styled(NavLink)`
  display: block;
  height: fit-content;
  padding: 5px 25px;
  background-color: var(--link-background);
  border: 1px solid var (--primary-light);
  border-radius: 5px;
  transition all .2s;

	&:hover {
		color: var(--active-nav); 
  }

  &.active {
		width: 200%;
		color: var(--active-nav);
    border-color: var(--active-nav);
    box-shadow: 0 0 50px var(--active-nav);
		letter-spacing: 2px;
  }
`;
