import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FullType, PokemonInfo } from 'types/api/responseTypes';
import { Type } from 'types/pokemon';
import { memoizedGetAPIResourceList } from 'utils/getAPIResourceList';
import { TypeIcons } from '../assets/pokemon-type-icons';

interface ModalInnerProps {
  link?: string;
}

const ModalInner: React.FC<ModalInnerProps> = ({ link }) => {
  const [info, setInfo] = useState<PokemonInfo | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!link) {
      setInfo(null);
    }

    memoizedGetAPIResourceList(link as string).then((modalInfo) => setInfo(modalInfo));
  }, [link]);

  const typeMapping = (array: FullType[]) => {
    return array.map((type) => (
      <TypeIcon
        key={type.type.name}
        src={TypeIcons[type.type.name as Type]}
        title={type.type.name}
      />
    ));
  };

  const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  if (!info) {
    return <Spin size="large" spinning={true} />;
  }

  return (
    <StyledContainer data-testid={info.name}>
      <StyledImageContainer>
        <StyledHeader>{capitalize(info.name)}</StyledHeader>
        {!loaded && (
          <StyledImageSpiner>
            <Spin size="large" spinning={true} data-testid="spinner" />
          </StyledImageSpiner>
        )}
        <StyledImage
          src={
            (info.sprites.other.dream_world.front_default as string)
              ? (info.sprites.other.dream_world.front_default as string)
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${info.id}.svg`
          }
          onLoad={() => setLoaded(true)}
        />
      </StyledImageContainer>
      <StyledStatsContainer>
        <StyledListItem>
          <h3>Dex Number :</h3>
          <h4>{info.id}</h4>
        </StyledListItem>

        {info.stats.map((stat) => (
          <StyledListItem key={stat.stat.name.toUpperCase()}>
            <h3>{stat.stat.name} : </h3>
            <h4>{stat.base_stat}</h4>
          </StyledListItem>
        ))}

        <StyledListItem>
          <h3>Height :</h3>
          <h4>{info.height}</h4>
        </StyledListItem>

        <StyledListItem>
          <h3>Weight :</h3>
          <h4>{info.weight}</h4>
        </StyledListItem>

        <StyledListItem>
          <>
            <h3>Type :</h3>
            <IconContainer>{typeMapping(info.types)}</IconContainer>
          </>
        </StyledListItem>
      </StyledStatsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 2fr 1fr;

  & * {
    color: black;
  }
`;

const StyledHeader = styled.div`
  width: 70%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--hero-background);
  font-weight: bold;
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
`;

const StyledImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
`;

const StyledImageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledStatsContainer = styled.ul`
  width: 100%;
  height: 100%;
  background-color: var(--main-background);
  border: 15px ridge var(--modal-border);
  border-radius: 30px;

  list-style-type: none;

  & :nth-child(1) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  & > :nth-child(2n-1) {
    background-color: var(--modal-border);
  }
`;

const StyledListItem = styled.li`
display:grid;
grid-template-columns: 4fr 1fr;
align-items:center;
height:10%;
padding 0 10px;
gap:10px;`;

const TypeIcon = styled.img`
  display: inline-block;
  width: 32px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledImageSpiner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ModalInner;
