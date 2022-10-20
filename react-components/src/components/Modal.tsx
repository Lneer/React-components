import React from 'react';
import styled from 'styled-components';
import closeIcon from '../assets/close-icon.svg';

export interface ModalProps {
  visible?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible = false, children, onClose = () => {} }) => {
  return (
    <>
      {visible && (
        <ModalContainer data-testid="modal">
          <ModalOverlay onClick={onClose}></ModalOverlay>
          <ModalWindow>
            <ButtonClose onClick={onClose} data-testid="modalClose" />
            <ModalMessage>{children}</ModalMessage>
          </ModalWindow>
        </ModalContainer>
      )}
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--modal-background);
  z-index: 4;
`;

const ModalWindow = styled.div`
  position: relative;
  max-width: 900px;
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  margin: 20px;
  border: 3px solid var(--modal-border);
  background-color: var(--primary-light);
  border-radius: 20px;
  z-index: 5;
`;

const ButtonClose = styled.button`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -50px;
  right: -50px;
  background: url(${closeIcon}) transparent no-repeat;
  border: 1px solid;
  border-radius: 200px;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    filter: saturate(0%) brightness(200%);
  }
`;

const ModalMessage = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Modal;
