import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Spin, Pagination } from 'antd';
import { ApiCard, Modal, ModalInner, PageHero, Search } from 'components';
import { ContextApp } from 'context/Store';
import styled from 'styled-components';
import { NamedAPIResourceList } from 'types/api/responseTypes';
import { memoizedGetAPIResourceList } from 'utils/getAPIResourceList';
import { imageUrlAdapter } from 'utils/imageUrlAdapter';
import { Types } from 'redusers/reduser';

const MainPage: React.FC = () => {
  const context = useContext(ContextApp);
  const { state } = context;

  const [resourceList, setResourceList] = useState<NamedAPIResourceList>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [infoLink, setInfoLink] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    `https://pokeapi.co/api/v2/pokemon?limit=${state.pageSize}&offset=${
      state.pageSize * (state.page - 1)
    }`
  );

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

  const changeHandler = (page: number, pageSize: number) => {
    setUrl(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
    context.dispatch({
      type: 'SET_PAGE' as Types.SetPage,
      payload: { page },
    });

    context.dispatch({
      type: 'SET_PAGE_SIZE' as Types.SetPageSize,
      payload: { pageSize },
    });
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
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = './logo512.png';
            }}
          ></ApiCard>
        ))}
      </AlbumContainer>
      <StyledPagination
        total={resourceList.count}
        onChange={changeHandler}
        defaultPageSize={state.pageSize}
        defaultCurrent={state.page}
        pageSizeOptions={['20', '50', '100']}
      />

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
  display: flex;
  justify-content: center;
  transform: scale(1.4);
  margin: 50px 0;

  & > li .ant-select-dropdown {
    left: 0px !important;
    top: calc(-7rem + 3px) !important;
  }
`;
export default MainPage;
