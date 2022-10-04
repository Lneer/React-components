import React from 'react';
import styled from 'styled-components';

interface PageHeroProps {
  label?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ label, children }) => {
  return (
    <StyledHero>
      <h1>{label}</h1>
      {children}
    </StyledHero>
  );
};

export default PageHero;

const StyledHero = styled.section`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  background-color: var(--hero-background);
`;
