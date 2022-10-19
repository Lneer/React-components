import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import pokeBall from '../assets/pokeBall.svg';

interface ApiCardProps {
  name?: string;
  img?: string;
  onClick?: (event?: React.MouseEvent<HTMLImageElement>) => void;
}

interface ApiCardState {
  isSelected: boolean;
}

class ApiCard extends Component<ApiCardProps, ApiCardState> {
  state = { isSelected: false };

  setCardSelector = (): void => {
    this.setState(() => {
      return { isSelected: !this.state.isSelected };
    });
  };

  pokeBall = (): React.ReactNode => {
    return (
      <Button $isSelect={this.state.isSelected} onClick={this.setCardSelector}>
        <img src={pokeBall} alt="pokeBall" />
      </Button>
    );
  };

  cardTitle = (children?: React.ReactNode, isSelected = false): React.ReactNode => {
    return (
      <CardTitleContainer>
        <CardTitle $isSelect={isSelected}>{this.props && this.props.name}</CardTitle>
        <CardSubtitle>{children}</CardSubtitle>
      </CardTitleContainer>
    );
  };

  render() {
    if (!this.props) {
      return null;
    }
    return (
      <>
        <CardWrapper>
          <CardBody>
            <CardImage
              data-set={this.props.name}
              src={this.props.img}
              alt={this.props.name}
              onClick={this.props.onClick}
            />
            <DescriptionWrapper $isSelect={this.state.isSelected}>
              <Description $isSelect={false}>
                {this.cardTitle()}
                {this.pokeBall()}
              </Description>
              <Description $isSelect={true}>
                {this.cardTitle(<p>Has been choosen</p>, true)}
              </Description>
            </DescriptionWrapper>
          </CardBody>
        </CardWrapper>
      </>
    );
  }
}

const CardBody = styled.div`
  width: 100%;
  height: 100%;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  cursor: pointer;
`;

const DescriptionWrapper = styled.div<{ $isSelect: boolean }>`
  width: 200%;
  height: 100px;
  transition: transform 0.5s;
  display: flex;
  color: var(--primary-dark);
  transform: ${({ $isSelect }) => ($isSelect ? ' translateX(-35%)' : 'transform:translateX(0)')};
`;

const Toggle = css`
  background: var(--card-primary);
  color: var(--primary-light);
`;

const Description = styled.div<{ $isSelect: boolean }>`
  width: 50%;
  height: 100%;
  display: flex;
  overflow: hidden;
  transition: transform 0.5s;
  color: var(--primary-dark);
  ${({ $isSelect }) => ($isSelect && Toggle ? Toggle : '')}
`;

const CardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  gap: 5px;
  padding-left: 20px;
  width: 70%;
`;

const CardTitle = styled.h2<{ $isSelect: boolean }>`
  margin-bottom: 5px;
  font-size: 1.7rem;
  ${({ $isSelect }) => ($isSelect ? 'color: var(--primary-light)' : 'color: var(--primary-dark)')};
`;

const CardSubtitle = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.div<{ $isSelect: boolean }>`
  width: 30%;
  height: 100%;
  transition: transform 0.5s;
  padding: 10px 10px;
  ${({ $isSelect }) => ($isSelect && Toggle ? Toggle : '')}

  &:hover > img {
    transition: transform 0.5s;
    transform: rotate(360deg);
    cursor: pointer;
  }
`;

const CardWrapper = styled.div`
  width: 300px;
  height: 400px;
  margin: auto;

  overflow: hidden;
  position: relative;

  background: var(--card-background);
  border-radius: 10px 10px 10px 10px;
  border: solid 5px var(--card-primary);

  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;

  &:hover {
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
  }
`;

export default ApiCard;
