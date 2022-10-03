import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainPage } from 'pages';

describe('MainPage', () => {
  it('Search filter works', () => {
    render(<MainPage />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByText(/bulbasa/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/ivysaur/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/charmander/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/kakuna/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/butterfree/i)[0]).toBeInTheDocument();

    userEvent.type(screen.getByRole('textbox'), 'bu');

    expect(screen.queryAllByText(/bulbasa/i)[0]).toBeInTheDocument();
    expect(screen.queryByText(/ivysaur/i)).toBeNull();
    expect(screen.queryByText(/charmander/i)).toBeNull();
    expect(screen.queryByText(/kakuna/i)).toBeNull();
    expect(screen.queryAllByText(/butterfree/i)[0]).toBeInTheDocument();

    userEvent.clear(screen.getByRole('textbox'));

    expect(screen.getAllByText(/bulbasa/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/ivysaur/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/charmander/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/kakuna/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/butterfree/i)[0]).toBeInTheDocument();
  });
});
