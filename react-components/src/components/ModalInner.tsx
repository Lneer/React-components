import React, { Component } from 'react';
import styled from 'styled-components';

interface MadalInnerProps {
  url?: string;
}
class ModalInner extends Component<MadalInnerProps> {
  render() {
    return (
      <StyledContainer>
        <StyledImageContainer>
          <StyledHeader>Pokemon Name</StyledHeader>
          <StyledImage src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" />
        </StyledImageContainer>
        <StyledStatsContainer>
          <StyledListItem>
            <h3>Dex Number :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>HP :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Height :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Weight :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Type :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Attack :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Defense :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Special Attack :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Special Defense :</h3>
            <h4>1</h4>
          </StyledListItem>
          <StyledListItem>
            <h3>Speed :</h3>
            <h4>1</h4>
          </StyledListItem>
        </StyledStatsContainer>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 2fr 1fr;
`;

const StyledHeader = styled.div`
  width: 70%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--hero-background);
  font-weight: bold;
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
`;

const StyledImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
`;

const StyledImageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledStatsContainer = styled.ul`
  width: 100%;
  height: 100%;
  background-color: var(--main-background);
  border: 15px ridge var(--modal-border);
  border-radius: 30px;

  list-style-type: none;

  & :nth-child(1) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  & > :nth-child(2n-1) {
    background-color: blue;
  }
`;

const StyledListItem = styled.li`
display:grid;
grid-template-columns: 4fr 1fr;
align-items:center;
height:10%;
padding 0 10px;
gap:10px;`;

export default ModalInner;
