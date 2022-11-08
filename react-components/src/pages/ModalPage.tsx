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
  padding-top: 2rem; ;
`;
export default ModalPage;
