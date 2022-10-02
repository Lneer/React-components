import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../components';
import { MemoryRouter } from 'react-router-dom';

describe('Layout tests', () => {
  it('is render', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
