import { ContextApp } from 'context/Store';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { SubmitContext } from '../../context/SubmitContext';

interface FormInnerProps {
  type?: string;
  label?: string;
  reference?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement | undefined>;
  name?: string;
  valid?: boolean;
  errormassege?: string;
  children?: React.ReactNode;
  testId?: string;
}

const FormInner: React.FC<FormInnerProps> = (props) => {
  const { type = 'text', label, reference, name, valid, errormassege, children, testId } = props;

  const onChange = useContext(SubmitContext);
  const { state } = useContext(ContextApp);

  if (type === 'select') {
    return (
      <label>
        <h3>{label}</h3>
        <StyledSelect
          name={name}
          value={state.formFields.gender}
          data-testid={testId}
          ref={reference as React.RefObject<HTMLSelectElement>}
          $vaild={!!valid}
          onChange={(e) => {
            if (reference?.current) {
              reference.current.value = e.target.value;
              onChange(e);
            }
          }}
        >
          {children}
        </StyledSelect>
        <StyledErrorMessege $vaild={!!valid}>{errormassege}</StyledErrorMessege>
      </label>
    );
  }

  if (type === 'switch') {
    return (
      <label>
        <h3>{label}</h3>
        <SwitchInput
          name={name}
          type="checkbox"
          id="switch"
          ref={reference as React.RefObject<HTMLInputElement>}
          onChange={onChange}
          data-testid={testId}
        />
        <SwitchLabel htmlFor="switch" />
        <StyledErrorMessege $vaild={!!valid}>{errormassege}</StyledErrorMessege>
      </label>
    );
  }

  return (
    <label>
      <h3>{label}</h3>
      <StyledInputWrapper $vaild={!!valid}>
        <StyledInput
          name={name}
          type={type}
          ref={reference as React.RefObject<HTMLInputElement>}
          onChange={onChange}
          data-testid={testId}
        />
      </StyledInputWrapper>
      <StyledErrorMessege data-testid={`${testId}-err`} $vaild={!!valid}>
        {errormassege}
      </StyledErrorMessege>
    </label>
  );
};

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
