import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Modal, ModalInner } from '../components';
import { MainPage } from 'pages';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  cleanup();
});
const close = jest.fn();

describe('Modal tests', () => {
  it('render Modal', () => {
    render(<Modal />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('render Modal', () => {
    render(<Modal visible={true} />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('close Modal', () => {
    render(<Modal visible={true} onClose={close} />);

    userEvent.click(screen.getByTestId('modalClose'));
    userEvent.click(screen.getByTestId('modalClose'));
    userEvent.click(screen.getByTestId('modalClose'));

    expect(close).toBeCalledTimes(3);
  });

  it('render ModalInner', async () => {
    render(
      <Modal visible={true}>
        <ModalInner link="https://pokeapi.co/api/v2/pokemon/1" />
      </Modal>
    );
    const pokeName = await screen.findByTestId(/bulbasaur/g);
    expect(pokeName).toBeInTheDocument();
  });

  it('renderPage', async () => {
    render(<MainPage />);
    const bulbasaur = await screen.findAllByRole('heading', { name: 'bulbasaur' });
    const rattata = await screen.findAllByRole('heading', { name: 'rattata' });

    expect(bulbasaur[0]).toBeInTheDocument();
    expect(rattata[0]).toBeInTheDocument();
  });
});
