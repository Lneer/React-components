import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form } from '../components';
import userEvent from '@testing-library/user-event';

const file = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('form test', () => {
  it('form render', () => {
    render(<Form sendCard={() => {}} />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('fields render', () => {
    render(<Form sendCard={() => {}} />);
    expect(screen.getByTestId(/name/i)).toBeInTheDocument();
    expect(screen.getByTestId(/nick/i)).toBeInTheDocument();
    expect(screen.getByTestId(/date/i)).toBeInTheDocument();
    expect(screen.getByTestId(/avatar/i)).toBeInTheDocument();
    expect(screen.getByTestId(/gender/i)).toBeInTheDocument();
    expect(screen.getByTestId(/hobby/i)).toBeInTheDocument();
    expect(screen.getByTestId(/check/i)).toBeInTheDocument();
  });

  it('Submit disabled after first render', () => {
    render(<Form sendCard={() => {}} />);
    expect(screen.getByTestId(/submit/i)).toHaveAttribute('disabled');
  });

  describe('Submit active after first input', () => {
    it('name input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.type(screen.getByTestId(/name/i), 'test');
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });

    it('nick input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.type(screen.getByTestId(/nick/i), 'test');
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });

    it('hobby input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.click(screen.getByTestId(/Photo/i));
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });

    it('gender input', () => {
      render(<Form sendCard={() => {}} />);
      userEvent.selectOptions(screen.getByTestId(/gender/i), ['male']);
      expect(screen.getByTestId(/submit/i)).not.toHaveAttribute('disabled');
    });
  });

  it('file input', () => {
    render(<Form sendCard={() => {}} />);
    userEvent.upload(screen.getByTestId(/avatar/i), file);
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
      userEvent.type(screen.getByTestId(/name/i), 'te');

      expect(screen.getByText(/years old/i)).not.toBeVisible();

      userEvent.click(screen.getByTestId(/submit/i));

      expect(screen.getByText(/years old/i)).toBeVisible();
    });
  });
});
