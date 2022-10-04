import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHero } from '../components';

describe('PageHero tests', () => {
  it('is render with label', () => {
    render(<PageHero label="testPage" />);

    expect(screen.getByText('testPage')).toBeInTheDocument();
  });

  it('is render without label', () => {
    render(<PageHero />);

    expect(screen.getByRole('heading')).toBeEmptyDOMElement();
  });

  it('is render with children', () => {
    render(
      <PageHero>
        <p>Hero Children</p>
      </PageHero>
    );

    expect(screen.getByText(/Hero Children/i)).toBeInTheDocument();
  });
});
