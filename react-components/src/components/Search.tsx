import React, { Component } from 'react';
import pokeBall from '../assets/pokeBall.svg';
import styled, { css } from 'styled-components';

interface SearchProps {
  onSearch: (data: string) => void;
}

interface SearchState {
  searchValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  state = { searchValue: '' };

  stateManager(state: string) {
    this.setState({
      searchValue: state,
    });
    this.props.onSearch(state);
  }

  componentDidMount(): void {
    const searchValue = localStorage.getItem('searchValue');

    if (searchValue) {
      this.setState({ searchValue });
    }
  }

  componentDidUpdate(): void {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  componentWillUnmount(): void {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  render() {
    return (
      <SearchBox>
        <StyledInput
          $isEmpty={!this.state.searchValue}
          type="text"
          placeholder="search"
          value={this.state.searchValue}
          onChange={(event) => {
            this.stateManager(event.target.value);
          }}
        />
        <Button onClick={() => this.stateManager('')}>
          <img src={pokeBall} alt="pokeBall" />
        </Button>
      </SearchBox>
    );
  }
}

const InputFulltWidth = css`
  width: 100%;
  padding-left: 2rem;
`;

const SearchBox = styled.div`
  width: fit-content;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--primary-light);

  border-radius: 200px;

  &:hover > input {
    ${InputFulltWidth}
  }
`;

const StyledInput = styled.input<{ $isEmpty: boolean }>`
  height: 100%;
  border: none;
  font-size: 2rem;
  border-radius: 200px 0 0 200px;
  transition: 1s;
  background: none;
  outline: 0;
  ${({ $isEmpty }) => ($isEmpty ? 'width: 0' : InputFulltWidth)};
`;

const Button = styled.button`
  height: 100%;
  aspect-ratio: 1/1;
  border: none;
  background: none;
  outline: 0;
  border-radius: 100%;
  transition: 0.3s;
  &:active {
    transform: scale(0.85);
  }
`;

export default Search;
