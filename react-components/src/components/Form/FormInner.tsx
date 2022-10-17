import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { SubmitContext } from '../../context/SubmitContext';

interface FormInnerProps {
  type?: string;
  label?: string;
  reference?: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  isRequired?: boolean;
  name?: string;
  valid?: boolean;
  errormassege?: string;
  children?: React.ReactNode;
  testId?: string;
}

class FormInner extends Component<FormInnerProps> {
  static contextType = SubmitContext;

  render() {
    if (this.props.type === 'select') {
      return (
        <SubmitContext.Consumer>
          {(onChange) => (
            <label>
              <h3>{this.props.label}</h3>
              <StyledSelect
                name={this.props.name}
                defaultValue="default"
                data-testid={this.props.testId}
                ref={this.props.reference as React.RefObject<HTMLSelectElement>}
                $vaild={!!this.props.valid}
                onChange={(e) => {
                  if (this.props.reference?.current) {
                    this.props.reference.current.value = e.target.value;
                    onChange(e);
                  }
                }}
              >
                {this.props.children}
              </StyledSelect>
              <StyledErrorMessege $vaild={!!this.props.valid}>
                {this.props.errormassege}
              </StyledErrorMessege>
            </label>
          )}
        </SubmitContext.Consumer>
      );
    }

    if (this.props.type === 'switch') {
      return (
        <SubmitContext.Consumer>
          {(onChange) => (
            <label>
              <h3>{this.props.label}</h3>
              <SwitchInput
                name={this.props.name}
                type="checkbox"
                id="switch"
                ref={this.props.reference as React.RefObject<HTMLInputElement>}
                onChange={onChange}
                data-testid={this.props.testId}
              />
              <SwitchLabel htmlFor="switch" />
              <StyledErrorMessege $vaild={!!this.props.valid}>
                {this.props.errormassege}
              </StyledErrorMessege>
            </label>
          )}
        </SubmitContext.Consumer>
      );
    }
    return (
      <SubmitContext.Consumer>
        {(onChange) => (
          <label>
            <h3>{this.props.label}</h3>
            <StyledInputWrapper $vaild={!!this.props.valid}>
              <StyledInput
                name={this.props.name}
                type={this.props.type ? this.props.type : 'text'}
                ref={this.props.reference as React.RefObject<HTMLInputElement>}
                onChange={onChange}
                data-testid={this.props.testId}
              />
            </StyledInputWrapper>
            <StyledErrorMessege $vaild={!!this.props.valid}>
              {this.props.errormassege}
            </StyledErrorMessege>
          </label>
        )}
      </SubmitContext.Consumer>
    );
  }
}

const borderMode = css<{ $vaild: boolean }>`
  border: ${({ $vaild }) => ($vaild ? '3px solid #7c6c4e' : '3px solid var(--error-primary)')};
`;

const visionMode = css<{ $vaild: boolean }>`
  visibility: ${({ $vaild }) => ($vaild ? ' hidden' : ' visible')};
`;

const StyledInputWrapper = styled.div<{ $vaild: boolean }>`
  width: 80%;
  border-radius: 100px;
  background-color: #d4c7b5;
  ${borderMode}
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  background: none;
  border: none;
  padding: 0 10px;
  outline: 0;
`;

const StyledErrorMessege = styled.div<{ $vaild: boolean }>`
  margin-top: 0.3rem;
  color: var(--error-primary);
  font-size: 0.8rem;
  width: 80%;
  text-align: center;
  ${visionMode}
`;

const StyledSelect = styled.select<{ $vaild: boolean }>`
  width: 80%;
  padding: 2px 20px;
  display: block;
  font-size: 1.2rem;
  height: 2rem;
  border-radius: 100px;
  background-color: #d4c7b5;
  ${borderMode}
`;
const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
  &:checked + label {
    background: #d4c7b5;
  }
  &:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
`;

const SwitchLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 80px;
  height: 2rem;
  background: grey;
  display: block;
  border: 2px solid #7c6c4e;
  border-radius: 100px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 26px;
    height: 26px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  &:active:after {
    width: 35px;
  }
`;

export default FormInner;
