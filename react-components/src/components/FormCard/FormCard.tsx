import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class FormCard extends Component {
  render() {
    return (
      <Wrapper>
        <StyledFormCard>
          <Header src="./images/cardHeader.png" alt="header" />
          <CardContent>
            <UserImageContaiter>
              <ImageWrapper>
                <UserImage src="./images/tes1t.jpg" alt="logo" />
              </ImageWrapper>
            </UserImageContaiter>
          </CardContent>
          <MapImage src="./images/map.png" alt="map" />
          <Footer src="./images/cardFooter.png" alt="footer" />
        </StyledFormCard>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 0 auto;

  width: 480px;
  aspect-ratio: 16/9;

  background-color: #7c6c4e;
`;

const StyledFormCard = styled.div`
  margin: 0 auto;

  width: calc(100% - 14px);
  height: 100%;

  position: relative;

  background-image: url('./images/background.png');
  background-size: cover;
  box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6);
`;

const ImageAttr = css`
  display: block;
  width: 100%;
  position: absolute;
  z-index: 20;
  transform: scale(1.1, 1);
`;

const Header = styled.img`
  top: -10px;
  ${() => ImageAttr}
`;

const Footer = styled.img`
  bottom: -10px;
  ${() => ImageAttr}
`;

const CardContent = styled.div`
  position: relative;
`;
const UserImageContaiter = styled.div`
  width: 35%;
  aspect-ratio: 11/16;

  position: absolute;
  z-index: 10;
  top: 15px;
  left: 30px;
  display: grid;
  justify-items: center;
  align-items: center;
  transform: rotate(10deg);

  background-color: #f5f3f0;
`;

const UserImage = styled.img`
  transform: rotate(-10deg);
  width: 125%;
`;

const MapImage = styled.img`
  width: 30%;
  position: absolute;
  bottom: -20px;
  left: -50px;
  z-index: 30;
  transform: rotate(-10deg);
`;

const ImageWrapper = styled.div`
  width: calc(100% - 25px);
  height: calc(100% - 25px);
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;
export default FormCard;
