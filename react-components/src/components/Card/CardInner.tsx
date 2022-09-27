import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { TypeIcons } from '../../assets/pokemon-type-icons';
import pokeBall from '../../assets/pokeBall.svg';
import Pokemon from 'types/pokemon';

interface CardInnerProps {
  pokemon: Pokemon;
}

interface CardInnerState {
  isSelected: boolean;
}

export default class CardInner extends Component<CardInnerProps, CardInnerState> {
  constructor(props: CardInnerProps) {
    super(props);
    this.state = { isSelected: false };
  }

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

  mapping = (array: typeof this.props.pokemon.types): React.ReactNode => {
    return (
      <>
        {array.map((type, index) => (
          <TypeIcon key={index} src={TypeIcons[type]} title={type} />
        ))}
      </>
    );
  };

  cardTitle = (children: React.ReactNode, isSelected = false): React.ReactNode => {
    return (
      <CardTitleContainer>
        <CardTitle $isSelect={isSelected}>{this.props.pokemon.name}</CardTitle>
        <CardSubtitle>{children}</CardSubtitle>
      </CardTitleContainer>
    );
  };

  render() {
    return (
      <CardBody>
        <CardImage src={this.props.pokemon.img} alt={this.props.pokemon.name} />
        <DescriptionWrapper $isSelect={this.state.isSelected}>
          <Description $isSelect={false}>
            {this.cardTitle(this.mapping(this.props.pokemon.types))}
            {this.pokeBall()}
          </Description>
          <Description $isSelect={true}>
            {this.cardTitle(<p>Has been choosen</p>, true)}
          </Description>
        </DescriptionWrapper>
      </CardBody>
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
`;

const DescriptionWrapper = styled.div<{ $isSelect: boolean }>`
  width: 200%;
  height: 100px;
  transition: transform 0.5s;
  display: flex;
  color: var(--primary-dark);
  ${({ $isSelect }) => ($isSelect ? 'transform: translateX(-35%)' : 'transform: translateX(0)')}
`;

const Description = styled.div<{ $isSelect: boolean }>`
  width: 50%;
  height: 100%;
  display: flex;
  overflow: hidden;
  transition: transform 0.5s;
  color: var(--primary-dark);
  ${({ $isSelect }) => {
    if ($isSelect) {
      return css`
        background: var(--card-primary);
        color: var(--primary-light);
      `;
    }
  }}
`;

const CardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
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

  ${({ $isSelect }) => {
    if ($isSelect) {
      return css`
        background: var(--card-primary);
      `;
    }
  }}

  &:hover > img {
    transition: transform 0.5s;
    transform: rotate(360deg);
    cursor: pointer;
  }
`;

const TypeIcon = styled.img`
  display: inline-block;
  width: 32px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;
