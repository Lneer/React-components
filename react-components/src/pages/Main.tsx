import { Spin, Pagination } from 'antd';
import { ApiCard, Modal, ModalInner, PageHero, Search } from 'components';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { NamedAPIResourceList } from 'types/api/responseTypes';
import { memoizedGetAPIResourceList } from 'utils/getAPIResourceList';
import { imageUrlAdapter } from 'utils/imageUrlAdapter';

const MainPage: React.FC = () => {
  const [resourceList, setResourceList] = useState<NamedAPIResourceList>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [infoLink, setInfoLink] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    apiLoader(url);
  }, [url]);

  useLayoutEffect(() => {
    setSearchValue(localStorage.getItem('searchValue') || '');
  }, []);

  const apiLoader = (url: string) => {
    memoizedGetAPIResourceList(url).then((resourceList) => {
      setResourceList(resourceList);
    });
  };

  const changeHandler = (page: number) => {
    if (page > currentPage) {
      if (resourceList.next) {
        setUrl(resourceList.next);
      }
    }
    if (page < currentPage) {
      if (resourceList.previous) {
        setUrl(resourceList.previous);
      }
    }
    setCurrentPage(page);
  };
  const filter = (elem: Pick<NamedAPIResourceList, 'results'>) => {
    return elem.results.filter((pokemon) => pokemon.name.includes(searchValue));
  };

  const modalViewToggle = () => {
    setIsModal(!isModal);
  };

  const getCardInfo = (event?: React.MouseEvent<HTMLImageElement>) => {
    if (!event) {
      return;
    }

    const pokemonName = event.currentTarget.alt;
    const pokemonIndex = resourceList.results.findIndex((elem) => elem.name === pokemonName);

    setInfoLink(resourceList.results[pokemonIndex].url);
  };

  if (resourceList.count === 0) {
    return <Spin size="large" spinning={true} />;
  }

  return (
    <>
      <PageHero label="Main Page" />
      <SearchSection>
        <Search onSearch={setSearchValue} />
      </SearchSection>
      <AlbumContainer>
        {filter(resourceList).map((pokemon) => (
          <ApiCard
            key={pokemon.name}
            name={pokemon.name}
            img={imageUrlAdapter(pokemon.url)}
            onClick={(event?: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
              getCardInfo(event);
              modalViewToggle();
            }}
          ></ApiCard>
        ))}
      </AlbumContainer>
      <StyledPagination total={resourceList.count} pageSize={20} onChange={changeHandler} />
      <Modal visible={isModal} onClose={modalViewToggle}>
        <ModalInner link={infoLink} />
      </Modal>
    </>
  );
};

const SearchSection = styled.section`
  width: 100%;
  height: 10vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const AlbumContainer = styled.section`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
`;

const StyledPagination = styled(Pagination)`
  display flex;
  justify-content:center;
  transform: scale(1.4);
  margin: 50px auto;
`;
export default MainPage;
