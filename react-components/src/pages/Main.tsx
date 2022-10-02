import { Album, Search } from 'components';
import React, { Component } from 'react';
import Pokemon from 'types/pokemon';
import pokemon from '../types/pokemon.json';
import styled from 'styled-components';

export default class MainPage extends Component {
  state = { value: localStorage.getItem('searchValue') || '' };

  getSearchState = (value: string) => {
    this.setState({ value });
  };
  filter = (elem: Pokemon[]) => {
    if (!this.state.value.length) {
      return elem;
    } else return elem.filter((pokemon) => pokemon.name.includes(this.state.value));
  };
  render() {
    return (
      <>
        <h1>Main Page</h1>
        <SearchSection>
          <Search onSearch={this.getSearchState} />
        </SearchSection>
        <Album data={this.filter(pokemon as Pokemon[])} page={1} limit={20}></Album>
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
