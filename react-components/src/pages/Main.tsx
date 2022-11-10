import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Spin, Select } from 'antd';
import { responseAdapter, getAPIResourceList, pagination } from 'utils';
import { Album, PageHero, PageNumbers, Search } from 'components';
import { ContextApp } from 'context/Store';
import { setPage, setPageSize, setPokemonType } from 'context/actions';
import { NamedAPIResource } from 'types/api/responseTypes';

const MainPage: React.FC = () => {
  const context = useContext(ContextApp);
  const { state } = context;

  const [resourceList, setResourceList] = useState<ReturnType<typeof responseAdapter>>({
    count: 0,
    results: [],
  });

  const [searchValue, setSearchValue] = useState<string>('');

  const [pokemonTypes, setPokemonTypes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    if (state.pokemonType) {
      apiLoader(`https://pokeapi.co/api/v2/type/${state.pokemonType}`).then((response) => {
        const paginationResponse = pagination(response, state.page, state.pageSize);
        setResourceList(paginationResponse);
      });
    } else {
      const fullUrl = `https://pokeapi.co/api/v2/pokemon?limit=${state.pageSize}
      &offset=${state.pageSize * (state.page - 1)}`;
      apiLoader(fullUrl).then((response) => setResourceList(response));
    }

    getAPIResourceList('https://pokeapi.co/api/v2/type').then((pokemonTypes) => {
      setPokemonTypes(pokemonTypes.results);
    });
  }, [state.page, state.pageSize, state.pokemonType]);

  useLayoutEffect(() => {
    setSearchValue(localStorage.getItem('searchValue') || '');
  }, []);

  const apiLoader = async (url: string) => {
    const resourceList = await getAPIResourceList(url);
    return responseAdapter(resourceList);
  };

  const changeHandler = (page: number, pageSize: number) => {
    context.dispatch(setPage(page));

    context.dispatch(setPageSize(pageSize));
  };

  const changeTypeHandler = (pokemonType: unknown) => {
    context.dispatch(setPokemonType(pokemonType as string));
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
        <div>
          <FilterHeader>Pokemon type</FilterHeader>
          <StyledSelect
            size="large"
            onChange={changeTypeHandler}
            defaultValue={state.pokemonType}
            allowClear={true}
          >
            {pokemonTypes.map((type) => (
              <Select.Option key={type.name} value={type.name}>
                {type.name}
              </Select.Option>
            ))}
          </StyledSelect>
        </div>
      </FilterContainer>

      <Album searchValue={searchValue} resourceList={resourceList} />

      <PageNumbers
        total={resourceList.count}
        defaultPageSize={state.pageSize}
        defaultCurrent={state.page}
        pageSizeOptions={['20', '50', '100']}
        onChange={changeHandler}
      />
    </>
  );
};

const flexCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchSection = styled.section`
  width: 100%;
  height: 10vh;
  ${flexCss}
`;

const FilterContainer = styled.section`
  width: 100%;
  padding-bottom: 1rem;
  ${flexCss}
`;

const FilterHeader = styled.h3`
  text-align: center;
  color: black;
`;

const StyledSelect = styled(Select)`
  width: 10rem;
`;
export default MainPage;
