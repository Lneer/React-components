import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, PageHero, FormCard } from 'components';
import { UserData } from 'types/form/userData';

const FormPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);

  const getFormData = (data: UserData) => {
    const currentState = [...userData];
    currentState.push(data);
    setUserData(currentState);
  };

  return (
    <>
      <PageHero label="Form"></PageHero>
      <Form sendCard={(data) => getFormData(data)}></Form>
      <StyledCardWrapper>
        {userData.map((data) => (
          <FormCard userData={data} key={`${data.name}_${data.nick}`}></FormCard>
        ))}
      </StyledCardWrapper>
    </>
  );
};

const StyledCardWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(430px, 1fr));
`;

export default FormPage;
