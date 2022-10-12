import React, { Component } from 'react';
import styled from 'styled-components';
import { SubmitContext } from '../Context/SubmitContext';

interface FormInnerProps {
  type?: string;
  label?: string;
  reference?: React.RefObject<HTMLInputElement>;
  isRequired?: boolean;
  name?: string;
}

class FormInner extends Component<FormInnerProps> {
  static contextType = SubmitContext;

  render() {
    return (
      <SubmitContext.Consumer>
        {(onChange) => (
          <label>
            <h3>{this.props.label}</h3>
            <StyledInputWrapper>
              <StyledInput
                name={this.props.name}
                type={this.props.type ? this.props.type : 'text'}
                ref={this.props.reference}
                onChange={onChange}
              />
            </StyledInputWrapper>
          </label>
        )}
      </SubmitContext.Consumer>
    );
  }
}

const StyledInputWrapper = styled.div`
  width: 80%;
  border: 3px solid #7c6c4e;
  border-radius: 100px;
  background-color: #d4c7b5;
`;
const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  background: none;
  border: none;
  padding: 0 10px;
  outline: 0;
`;

export default FormInner;
