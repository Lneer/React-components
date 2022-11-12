import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Spin, Select } from 'antd';
import { Album, PageHero, PageNumbers, Search } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, changePageSize, changeType } from 'reduxStore/mainPageSlice';
import { AppDispatch, RootState } from 'reduxStore/store';
import { fetchResourceList, fetchPokemonType } from 'reduxStore/apiSlice';

const MainPage: React.FC = () => {
  const state = useSelector((state: RootState) => state.mainPage);
  const apistate = useSelector((state: RootState) => state.api);
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    dispatch(
      fetchResourceList({
        page: state.page,
        pageSize: state.pageSize,
        pokemonType: state.pokemonType,
      })
    );
  }, [state.page, state.pageSize, state.pokemonType, dispatch]);

  useEffect(() => {
    dispatch(fetchPokemonType('https://pokeapi.co/api/v2/type'));
  }, [dispatch]);

  useLayoutEffect(() => {
    setSearchValue(localStorage.getItem('searchValue') || '');
  }, []);

  const changeHandler = (page: number, pageSize: number) => {
    dispatch(changePage(page));
    dispatch(changePageSize(pageSize));
  };

  const changeTypeHandler = (pokemonType: unknown) => {
    dispatch(changeType(pokemonType as string));
  };

  if (apistate.resourceList.count === 0) {
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
            {apistate.pokemonTypes.map((type) => (
              <Select.Option key={type.name} value={type.name}>
                {type.name}
              </Select.Option>
            ))}
          </StyledSelect>
        </div>
      </FilterContainer>

      <Album searchValue={searchValue} resourceList={apistate.resourceList} />

      <PageNumbers
        total={apistate.resourceList.count}
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
