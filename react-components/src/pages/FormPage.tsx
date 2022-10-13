import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, PageHero, FormCard } from 'components';
import { UserData } from 'types/form/userData';

interface FormPageProps {
  name?: string;
}
interface FormPageState {
  data: UserData[];
}
class FormPage extends Component<FormPageProps, FormPageState> {
  state = { data: [] as UserData[] };

  getFormData = (data: UserData) => {
    const currentState = [...this.state.data];
    currentState.push(data);
    this.setState({ data: currentState });
  };

  render() {
    return (
      <>
        <PageHero label="Form"></PageHero>

        <Form sendCard={(data) => this.getFormData(data)}></Form>
        <StyledCardWrapper>
          {this.state.data.map((data) => (
            <FormCard userData={data} key={`${data.name}_${data.nick}`}></FormCard>
          ))}
        </StyledCardWrapper>
      </>
    );
  }
}

const StyledCardWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(430px, 1fr));
`;

export default FormPage;
