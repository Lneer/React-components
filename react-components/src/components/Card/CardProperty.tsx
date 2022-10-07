import React from 'react';
import styled from 'styled-components';
import Pokemon, { Stats } from 'types/pokemon';

interface CardPropertyProps {
  pokemon?: Pokemon;
}

const CardProperty: React.FC<CardPropertyProps> = ({ pokemon }) => {
  const statParser = (obj: Stats) => {
    const keys = Object.keys(obj);
    return keys.map((stat, index) => (
      <p key={index}>
        <strong>{stat}:</strong>
        {` ${obj[stat as keyof typeof obj]}`}
      </p>
    ));
  };

  if (!pokemon) return <PropertyContainer />;

  return (
    <PropertyContainer>
      <Properties>
        {statParser(pokemon.stats)}
        <BasicStats>
          <span>
            <strong>height:</strong> {pokemon.height}
          </span>
          <span>
            <strong>weight:</strong> {pokemon.weight}
          </span>
          <span>
            <strong>base exp:</strong> {pokemon.base_experience}
          </span>
        </BasicStats>
      </Properties>
    </PropertyContainer>
  );
};

const PropertyContainer = styled.div`
  width: 140px;
  height: 140px;

  position: absolute;
  top: -75px;
  right: -70px;
  z-index: 9;

  background: var(--card-primary);
  border-radius: 0px 0px 200px 200px;
  transition: all 0.5s, border-radius 1.5s, top 1s;

  opacity: 0.9;
  overflow: hidden;

  &:hover {
    width: 100%;
    right: 0;
    top: 0;
    border-radius: 0;
    height: 75%;
  }

  &:hover > * {
    opacity: 1;
  }
`;

const Properties = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  opacity: 0;
  & > * {
    color: var(--primary-dark);
  }
`;

const BasicStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 5px;
`;

export default CardProperty;
