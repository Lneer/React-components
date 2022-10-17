import { ApiCard, PageHero, Search } from 'components';
import React, { Component } from 'react';
import styled from 'styled-components';
import { NamedAPIResourceList } from 'types/api/responseTypes';
import { memoizedGetAPIResourceList } from 'utils/getAPIResourceList';
import { imageUrlAdapter } from 'utils/imageUrlAdapter';

interface ApiPageProps {
  prop?: string;
}

interface ApiPageState {
  value: string;
  resourceList: NamedAPIResourceList;
}

class ApiPage extends Component<ApiPageProps, ApiPageState> {
  defaultState: ApiPageState = {
    value: localStorage.getItem('searchValue') || '',
    resourceList: { count: 0, next: null, previous: null, results: [] },
  };

  state = this.defaultState;

  componentDidMount() {
    memoizedGetAPIResourceList('https://pokeapi.co/api/v2/pokemon').then((resourceList) =>
      this.setState({ ...this.state, resourceList }, () => console.log(this.state))
    );
  }

  getSearchState = (value: string) => {
    this.setState({ value });
  };

  filter = (elem: Pick<NamedAPIResourceList, 'results'>) => {
    return elem.results.filter((pokemon) => pokemon.name.includes(this.state.value));
  };

  render() {
    if (this.state.resourceList.count === 0) {
      return <h3>Loading...</h3>;
    }

    return (
      <>
        <PageHero label="Api" />
        <SearchSection>
          <Search onSearch={this.getSearchState} />
        </SearchSection>
        <AlbumContainer>
          {this.filter(this.state.resourceList).map((pokemon) => (
            <ApiCard
              key={pokemon.name}
              name={pokemon.name}
              img={imageUrlAdapter(pokemon.url)}
            ></ApiCard>
          ))}
        </AlbumContainer>

        {/* <Album data={this.filter(this.pagination(pokemon as Pokemon[], 1, 20))}></Album> */}
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
const AlbumContainer = styled.section`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
`;
export default ApiPage;
