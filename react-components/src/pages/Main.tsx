import { Album, PageHero, Search } from 'components';
import React, { Component } from 'react';
import Pokemon from 'types/pokemon';
import pokemon from '../types/pokemon.json';
import styled from 'styled-components';

class MainPage extends Component {
  state = { value: localStorage.getItem('searchValue') || '' };

  getSearchState = (value: string) => {
    this.setState({ value });
  };

  pagination = (data: Pokemon[], page?: number, limit = 10) => {
    if (!page) return data;
    return data.slice((page - 1) * limit, page * limit);
  };

  filter = (elem: Pokemon[]) => {
    return elem.filter((pokemon) => pokemon.name.includes(this.state.value));
  };

  render() {
    return (
      <>
        <PageHero label="Main Page" />
        <SearchSection>
          <Search onSearch={this.getSearchState} />
        </SearchSection>
        <Album data={this.filter(this.pagination(pokemon as Pokemon[], 1, 20))}></Album>
      </>
    );
  }
}

const SearchSection = styled.section`
  width: 100%;
  height: 10vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
