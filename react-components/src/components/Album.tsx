import Card from 'components/Card/Card';
import React from 'react';
import styled from 'styled-components';
import Pokemon from 'types/pokemon';

interface AlbumProps {
  data?: Pokemon[] | [];
}

const Album: React.FC<AlbumProps> = ({ data }) => {
  if (!data || !data.length) return <h3>No pokemons here...</h3>;
  return (
    <AlbumContainer>
      {data.map((elem) => (
        <Card key={elem.id} pokemon={elem}></Card>
      ))}
    </AlbumContainer>
  );
};

export default Album;

const AlbumContainer = styled.section`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
`;
