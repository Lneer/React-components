import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('Routing tests', () => {
  it('Basic navigation', async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(await screen.findByText(/main page/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/about page/i)).toBeInTheDocument();
  });

  it('404 page', async () => {
    const notFound = '/404';
    render(
      <MemoryRouter initialEntries={[notFound]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('bad page', async () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
