import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormCard } from '../components';

const fakeUser = {
  age: 12,
  gender: 'male',
  hobby: ['basket ball', 'video games', 'photo', 'read book'],
  img: 'blob:http://localhost:3000/e86f8145-a3ed-4992-aee9-31bf26755dcd',
  name: '1234',
  nick: '4321',
};

describe('formCard tests', () => {
  it('formCard render', () => {
    render(<FormCard />);
    expect(screen.getByTestId('formCard')).toBeInTheDocument();
  });

  it('formCard render with data', () => {
    render(<FormCard userData={fakeUser} />);
    expect(screen.getByText(/1234/i)).toBeInTheDocument();
  });
});
