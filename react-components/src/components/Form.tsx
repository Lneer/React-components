import React, { Component } from 'react';
import FormInner from './FormInner';
import { SubmitContext } from '../Context/SubmitContext';
import styled from 'styled-components';

interface FormProps {
  children?: React.ReactNode;
}

interface FormState {
  isCheck: boolean;
}

class Form extends Component<FormProps, FormState> {
  state = { isCheck: false };

  static Item = FormInner;

  static SubmitContext = SubmitContext;

  checkToggle = () => {};

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event.target);
    this.setState({ isCheck: true });
  };

  render() {
    return (
      <SubmitContext.Provider value={this.state.isCheck}>
        <StyledForm onSubmit={this.submitHandler}>
          {this.props.children}
          <button
            type="submit"
            onClick={(e) => {
              console.log(e.target);
              this.setState({ isCheck: true });
            }}
          >
            submit
          </button>
        </StyledForm>
      </SubmitContext.Provider>
    );
  }
}

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 200px);
`;
export default Form;
