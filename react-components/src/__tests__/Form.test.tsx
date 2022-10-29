import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form } from '../components';
import userEvent from '@testing-library/user-event';

const file = new File(['hello'], 'hello.png', { type: 'image/png' });

window.URL.createObjectURL = jest.fn();

describe('form test', () => {
  it('form render', () => {
    render(<Form sendCard={() => {}} />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('fields render', () => {
    render(<Form sendCard={() => {}} />);
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('nick')).toBeInTheDocument();
    expect(screen.getByTestId('date')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('gender')).toBeInTheDocument();
    expect(screen.getByTestId('hobby')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
  });

  it('Submit disabled after first render', () => {
    render(<Form sendCard={() => {}} />);
    expect(screen.getByTestId(/submit/i)).toHaveAttribute('disabled');
  });

  describe('Submit active after first input', () => {
    it('name input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.type(screen.getByTestId('name'), 'test');
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });

    it('nick input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.type(screen.getByTestId('nick'), 'test');
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });

    it('hobby input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.click(screen.getByTestId(/Photo/i));
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });

    it('gender input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.selectOptions(screen.getByTestId('gender'), ['male']);
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });
  });

  it('file input', () => {
    render(<Form sendCard={() => {}} />);
    userEvent.upload(screen.getByTestId('avatar'), file);
    expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
  });

  it('hobby input', () => {
    render(<Form sendCard={() => {}} />);
    userEvent.click(screen.getByTestId(/check/i));
    expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
  });

  describe('Submit wrong data', () => {
    it('name input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.type(screen.getByTestId('name'), 'te');

      expect(screen.getByTestId(/name-err/i)).toHaveStyle('visibility: hidden');

      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
      userEvent.click(screen.getByTestId(/submit/i));
      setTimeout(
        () => expect(screen.getByTestId(/name-err/i)).toHaveStyle('visibility: visible;'),
        1000
      );
    });
  });
});
