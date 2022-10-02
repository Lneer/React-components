import Card from 'components/Card/Card';
import React from 'react';
import styled from 'styled-components';
import Pokemon from 'types/pokemon';

interface AlbumProps {
  data: Pokemon[];
  page?: number;
  limit?: number;
}

const Album: React.FC<AlbumProps> = ({ data, page, limit }) => {
  const pagination = (data: Pokemon[], page?: number, limit = 10) => {
    if (!page) return data;
    return data.slice((page - 1) * limit, page * limit);
  };

  return (
    <AlbumContainer>
      {pagination(data, page, limit).map((elem) => (
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
