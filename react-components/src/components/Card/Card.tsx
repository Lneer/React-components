import React from 'react';
import Pokemon from 'types/pokemon';
import CardInner from './CardInner';
import CardProperty from './CardProperty';
import styled from 'styled-components';

interface CardProps {
  pokemon: Pokemon;
}

const Card: React.FC<CardProps> = ({ pokemon }) => {
  return (
    <CardWrapper>
      <CardInner pokemon={pokemon} />
      <CardProperty pokemon={pokemon} />
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 300px;
  height: 400px;
  margin: auto;

  overflow: hidden;
  position: relative;

  background: var(--card-background);
  border-radius: 10px 10px 10px 10px;
  border: solid 5px var(--card-primary);

  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;

  &:hover {
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
  }
`;

export default Card;
