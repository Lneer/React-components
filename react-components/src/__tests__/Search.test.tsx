import React from 'react';
import { render, screen } from '@testing-library/react';
import { Search } from '../components';

describe('Search tests', () => {
  it('is render', () => {
    const func = jest.fn;
    render(<Search onSearch={func} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
