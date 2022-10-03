import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../components';
import Pokemon from 'types/pokemon';
import userEvent from '@testing-library/user-event';

const exampleCard = {
  id: 79,
  name: 'slowpoke',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png',
  order: 125,

  height: 12,
  weight: 360,
  base_experience: 63,
  stats: {
    hp: 90,
    attack: 65,
    defense: 65,
    specialAttack: 40,
    specialDefense: 40,
    speed: 15,
  },
  types: ['water', 'psychic'],
  is_default: true,
};

describe('Card tests', () => {
  it('is render with props', () => {
    render(<Card pokemon={exampleCard as Pokemon} />);

    expect(screen.getAllByRole('heading', { name: 'slowpoke' })[0]).toBeInTheDocument();
  });

  it('is render no props', () => {
    render(<Card />);
    expect(screen.queryByRole('heading')).toBeEmptyDOMElement();
  });

  it('pokeballClick', () => {
    render(<Card pokemon={exampleCard as Pokemon} />);

    userEvent.click(screen.getByAltText(/pokeball/i));
    expect(screen.getByText(/Has been choosen/i)).toBeInTheDocument();
  });

  it('Card hover', () => {
    render(<Card pokemon={exampleCard as Pokemon} />);

    userEvent.hover(screen.getAllByRole('img')[0]);
    expect(screen.getByText(/hp/i)).toBeInTheDocument();
  });
});
