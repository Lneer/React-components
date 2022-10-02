import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('Routing tests', () => {
  it('Basic navigation', async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByText(/main page/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/about page/i)).toBeInTheDocument();
  });

  it('404 page', async () => {
    const notFound = '/404';
    render(
      <MemoryRouter initialEntries={[notFound]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('bad page', async () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
