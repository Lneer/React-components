import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Album } from '../components';
import userEvent from '@testing-library/user-event';
import exampleBase from '../../.jest/examplePokemonBase.json';
import Pokemon from 'types/pokemon';

describe('Layout tests', () => {
  it('is render without props', () => {
    render(<Album />);

    expect(screen.getByText(/no pokemons/i)).toBeInTheDocument();
  });

  it('is render with data', () => {
    render(<Album data={exampleBase as Pokemon[]} />);

    expect(screen.getAllByText(/slowpoke/i)[0]).toBeInTheDocument();
  });
});
