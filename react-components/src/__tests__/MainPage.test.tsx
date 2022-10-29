import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainPage } from 'pages';

describe('MainPage', () => {
  it('Search filter works', async () => {
    render(<MainPage />);

    expect(await screen.findByRole('textbox')).toBeInTheDocument();

    expect(await screen.findByAltText(/bulbasa/i)).toBeInTheDocument();
    expect(await screen.findByAltText(/venusaur/i)).toBeInTheDocument();

    userEvent.type(screen.getByRole('textbox'), 'bu');

    expect(screen.queryByAltText(/bulbasa/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/venusaur/i)).toBeNull();

    userEvent.clear(screen.getByRole('textbox'));

    expect(await screen.findByAltText(/bulbasa/i)).toBeInTheDocument();
    expect(await screen.findByAltText(/venusaur/i)).toBeInTheDocument();
  });
});
