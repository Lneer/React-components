import { ApiCard } from 'components';
import React from 'react';
import styled from 'styled-components';
import { NamedAPIResourceList } from 'types/api/responseTypes';
import { imageUrlAdapter, responseAdapter } from 'utils';

interface AlbumProps {
  searchValue: string;
  resourceList: ReturnType<typeof responseAdapter>;
  onClick: () => void;
}

const Album: React.FC<AlbumProps> = (props) => {
  const filter = (elem: Pick<NamedAPIResourceList, 'results'>) => {
    return elem.results.filter((pokemon) => pokemon.name.includes(props.searchValue));
  };

  return (
    <AlbumContainer>
      {filter(props.resourceList).map((pokemon) => (
        <ApiCard
          key={pokemon.name}
          name={pokemon.name}
          img={imageUrlAdapter(pokemon.url)}
          onClick={props.onClick}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = './logo512.png';
          }}
        />
      ))}
    </AlbumContainer>
  );
};

const AlbumContainer = styled.section`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
`;

export default Album;
