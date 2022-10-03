import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Search } from '../components';
import { storageMock } from '../../.jest/local.storage';
import userEvent from '@testing-library/user-event';

window.localStorage = storageMock();
const onChange = jest.fn();

beforeEach(() => {
  window.localStorage.clear();
  cleanup();
});

describe('Search tests', () => {
  it('is render', () => {
    render(<Search onSearch={onChange} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('props function call', () => {
    render(<Search onSearch={onChange} />);

    userEvent.type(screen.getByRole('textbox'), 'test');
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it('get value from localStorage ', () => {
    window.localStorage.setItem('searchValue', 'testValue');
    render(<Search onSearch={onChange} />);

    expect(screen.queryByDisplayValue('testValue')).toBeInTheDocument();
  });

  it('put value to the localStorage after unmount component', () => {
    const { unmount } = render(<Search onSearch={onChange} />);

    userEvent.type(screen.getByRole('textbox'), 'test');
    unmount();

    expect(window.localStorage.getItem('searchValue')).toEqual('test');
  });

  it('update value to the localStorage after update component', () => {
    render(<Search onSearch={onChange} />);

    userEvent.type(screen.getByRole('textbox'), 'test');

    expect(window.localStorage.getItem('searchValue')).toEqual('test');
  });
});
