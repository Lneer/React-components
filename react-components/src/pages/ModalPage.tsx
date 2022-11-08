import { ModalInner, PageHero } from 'components';

import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ModalPage: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <>
      <PageHero label={pathname} />
      <StyledModalContainer>
        <ModalInner />
      </StyledModalContainer>
    </>
  );
};

const StyledModalContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: 2rem;
  border: 5px solid var(--card-primary);
  border-bottom-right-radius: 35px;
  border-top-right-radius: 35px;
`;
export default ModalPage;
