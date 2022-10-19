import { Spin } from 'antd';
import { ApiCard, Modal, ModalInner, PageHero, Search } from 'components';
import React, { Component } from 'react';
import styled from 'styled-components';
import { NamedAPIResourceList } from 'types/api/responseTypes';
import { memoizedGetAPIResourceList } from 'utils/getAPIResourceList';
import { imageUrlAdapter } from 'utils/imageUrlAdapter';

interface ApiPageProps {
  prop?: string;
}

interface ApiPageState {
  modalView: boolean;
  value: string;
  resourceList: NamedAPIResourceList;
  infoLink: string;
}

class ApiPage extends Component<ApiPageProps, ApiPageState> {
  defaultState: ApiPageState = {
    modalView: false,
    value: localStorage.getItem('searchValue') || '',
    resourceList: { count: 0, next: null, previous: null, results: [] },
    infoLink: '',
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

  modalViewToggle = (event?: React.MouseEvent<HTMLImageElement>) => {
    if (event) {
      console.log(event.currentTarget.alt);
    }
    this.setState({ modalView: !this.state.modalView });
  };

  getCardInfo = (event?: React.MouseEvent<HTMLImageElement>) => {
    if (!event) {
      return;
    }

    const pokemonName = event.currentTarget.alt;
    const pokemonIndex = this.state.resourceList.results.findIndex(
      (elem) => elem.name === pokemonName
    );

    this.setState(
      {
        ...this.setState,
        infoLink: this.state.resourceList.results[pokemonIndex].url,
      },
      () => console.log('state', this.state)
    );
  };

  render() {
    if (this.state.resourceList.count === 0) {
      return <Spin size="large" spinning={true} />;
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
              onClick={(event?: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                this.getCardInfo(event);
                this.modalViewToggle();
              }}
            ></ApiCard>
          ))}
        </AlbumContainer>
        <Modal visible={this.state.modalView} onClose={this.modalViewToggle}>
          <ModalInner link={this.state.infoLink} />
        </Modal>
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
