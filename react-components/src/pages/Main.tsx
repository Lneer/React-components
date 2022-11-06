import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Spin, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { responseAdapter, imageUrlAdapter, getAPIResourceList } from 'utils';
import { ApiCard, Modal, ModalInner, PageHero, PageNumbers, Search } from 'components';
import { ContextApp } from 'context/Store';
import { NamedAPIResource, NamedAPIResourceList } from 'types/api/responseTypes';
import { Types } from 'redusers/reduser';

const MainPage: React.FC = () => {
  const context = useContext(ContextApp);
  const { state } = context;

  const [resourceList, setResourceList] = useState<ReturnType<typeof responseAdapter>>({
    count: 0,
    results: [],
  });

  const [cardInfoLink, setCardInfoLink] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const [pokemonTypes, setPokemonTypes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    if (state.pokemonType) {
      apiLoader(`https://pokeapi.co/api/v2/type/${state.pokemonType}`);
    } else {
      const fullUrl = `https://pokeapi.co/api/v2/pokemon?limit=${state.pageSize}
      &offset=${state.pageSize * (state.page - 1)}`;
      apiLoader(fullUrl);
    }

    getAPIResourceList('https://pokeapi.co/api/v2/type').then((pokemonTypes) => {
      setPokemonTypes(pokemonTypes.results);
    });
  }, [state.page, state.pageSize, state.pokemonType]);

  useLayoutEffect(() => {
    setSearchValue(localStorage.getItem('searchValue') || '');
  }, []);

  const apiLoader = (url: string) => {
    getAPIResourceList(url).then((resourceList) => {
      const adaptedResourceList = responseAdapter(resourceList);
      setResourceList(adaptedResourceList);
    });
  };

  const changeHandler = (page: number, pageSize: number) => {
    context.dispatch({
      type: 'SET_PAGE' as Types.SetPage,
      payload: { page },
    });

    context.dispatch({
      type: 'SET_PAGE_SIZE' as Types.SetPageSize,
      payload: { pageSize },
    });
  };

  const changeTypeHandler = (pokemonType: unknown) => {
    context.dispatch({
      type: 'SET_POKEMON_TYPE' as Types.setPokemonType,
      payload: { pokemonType } as { pokemonType: string },
    });
  };

  const filter = (elem: Pick<NamedAPIResourceList, 'results'>) => {
    return elem.results.filter((pokemon) => pokemon.name.includes(searchValue));
  };

  const modalViewClose = () => {
    setCardInfoLink('');
  };

  const getCardInfo = (event?: React.MouseEvent<HTMLImageElement>) => {
    if (!event) {
      return;
    }

    const pokemonName = event.currentTarget.alt;

    setCardInfoLink(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  };

  const AlbumRender = () => {
    return filter(resourceList).map((pokemon) => (
      <ApiCard
        key={pokemon.name}
        name={pokemon.name}
        img={imageUrlAdapter(pokemon.url)}
        onClick={(event?: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
          getCardInfo(event);
        }}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = './logo512.png';
        }}
      />
    ));
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

      <FilterContainer>
        <StyledSelect
          size="large"
          onChange={changeTypeHandler}
          defaultValue={state.pokemonType}
          allowClear={true}
        >
          {pokemonTypes.map((type) => (
            <Option key={type.name} value={type.name}>
              {type.name}
            </Option>
          ))}
        </StyledSelect>
      </FilterContainer>

      <AlbumContainer>{AlbumRender()}</AlbumContainer>

      <PageNumbers
        total={resourceList.count}
        defaultPageSize={state.pageSize}
        defaultCurrent={state.page}
        pageSizeOptions={['20', '50', '100']}
        onChange={changeHandler}
      />

      <Modal visible={!!cardInfoLink} onClose={modalViewClose}>
        <ModalInner link={cardInfoLink} />
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

const FilterContainer = styled.section`
  display: flex;
`;

const StyledSelect = styled(Select)`
  width: 10rem;
  padding-left: 1rem;
`;
export default MainPage;
