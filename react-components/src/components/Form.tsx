import React, { Component } from 'react';
import { SubmitContext } from 'Context/SubmitContext';
import styled from 'styled-components';
import { validateConditions } from 'utils/formValidateConditions';
import FormInner from './FormInner';
import { UserData } from 'types/form/userData';

interface SimpleFormProps {
  sendCard: (data: UserData) => void;
}

interface SimpleFormState {
  firstChangeForm: boolean;
  buttonDisabled: boolean;
  name: boolean;
  nick: boolean;
  date: boolean;
  file: boolean;
  gender: boolean;
  switch: boolean;
  hobbySelect: boolean;
}

class Form extends Component<SimpleFormProps, SimpleFormState> {
  static SubmitContext = SubmitContext;
  static Item = FormInner;

  nameInput: React.RefObject<HTMLInputElement> = React.createRef();
  nickNameInput: React.RefObject<HTMLInputElement> = React.createRef();
  dateInput: React.RefObject<HTMLInputElement> = React.createRef();
  fileInput: React.RefObject<HTMLInputElement> = React.createRef();
  switchInput: React.RefObject<HTMLInputElement> = React.createRef();
  genderSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  hobby = new Set<string>();

  state = {
    firstChangeForm: false,
    buttonDisabled: true,
    name: false,
    nick: false,
    date: false,
    file: false,
    gender: false,
    switch: false,
    hobbySelect: true,
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    let currentState: { [key: string]: boolean };

    switch (name) {
      case 'name':
        currentState = { [name]: this.validateConditions(this.nameInput) };
        break;

      case 'nick':
        currentState = { [name]: this.validateConditions(this.nickNameInput) };
        break;

      case 'date':
        currentState = { [name]: this.validateConditions(this.dateInput) };
        break;

      case 'file':
        currentState = { [name]: this.validateConditions(this.fileInput) };
        break;

      case 'switch':
        currentState = { [name]: this.validateConditions(this.switchInput) };
        break;

      case 'gender':
        currentState = { [name]: this.validateConditions(this.genderSelect) };
        break;

      default:
        return;
    }

    this.setState((prev) => {
      return { ...prev, ...currentState };
    }, this.setSubmitButton);
  };

  setSubmitButton = () => {
    if (!this.state.firstChangeForm) {
      this.setState((prev) => {
        return { ...prev, buttonDisabled: false };
      });
      return;
    }

    if (this.validationAll()) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  validateConditions = validateConditions;

  isValidComponent = (state: keyof typeof this.state, condition: boolean) => {
    if (condition) {
      this.setState((prev) => {
        return { ...prev, [state]: true };
      });

      return true;
    } else {
      this.setState((prev) => {
        return { ...prev, [state]: false };
      });
      return false;
    }
  };

  validationAll = () => {
    const isValid = true;
    if (
      isValid &&
      this.state.name &&
      this.state.nick &&
      this.state.date &&
      this.state.file &&
      this.state.gender &&
      this.state.switch
    ) {
      return isValid;
    }
    return false;
  };

  hobbyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(this.hobby);
    const value = event.target.value.toLowerCase();
    this.hobby.has(value) ? this.hobby.delete(value) : this.hobby.add(value);
    this.setState({ hobbySelect: true });
    console.log(this.hobby);
  };

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(this.state);

    this.setState((prev) => {
      return { ...prev, firstChangeForm: true };
    });

    if (!this.validationAll()) {
      this.setState((prev) => {
        return { ...prev, buttonDisabled: true };
      });
      return;
    }

    const userData = {
      name: this.nameInput.current!.value,
      nick: this.nickNameInput.current!.value,
      age: new Date().getFullYear() - new Date(this.dateInput.current!.value).getFullYear(),
      gender: this.genderSelect.current!.value,
      img: URL.createObjectURL(this.fileInput.current!.files![0]),
      hobby: Array.from(this.hobby),
    };
    this.props.sendCard(userData);
    this.resetStateInputs();
  };

  resetStateInputs = () => {
    !this.nameInput.current ? this.nameInput.current : (this.nameInput.current.value = '');
    !this.nickNameInput.current ? this.nameInput.current : (this.nickNameInput.current.value = '');
    !this.dateInput.current ? this.nameInput.current : (this.dateInput.current.value = '');
    !this.fileInput.current ? this.nameInput.current : (this.fileInput.current.value = '');
    !this.switchInput.current ? this.nameInput.current : (this.switchInput.current.checked = false);
    !this.genderSelect.current
      ? this.nameInput.current
      : (this.genderSelect.current.value = 'default');
    this.hobby.clear();
    this.setState({
      firstChangeForm: false,
      buttonDisabled: true,
      name: false,
      nick: false,
      date: false,
      file: false,
      gender: false,
      switch: false,
      hobbySelect: true,
    });
  };

  render() {
    const hobby = ['Basket ball', 'Video games', 'Photo', 'Sport', 'Read book', 'Hand made'];

    return (
      <SubmitContext.Provider value={this.changeHandler}>
        <StyledForm onSubmit={this.submitHandler}>
          <Form.Item label="Name:" name="name" type="text" reference={this.nameInput} />
          <Form.Item label="Nick name:" name="nick" type="text" reference={this.nickNameInput} />
          <Form.Item label="Birth Day:" name="date" type="date" reference={this.dateInput} />
          <Form.Item label="Avatar:" name="file" type="file" reference={this.fileInput} />
          <label>
            <h3>Select gender:</h3>
            <StyledSelect
              name="gender"
              defaultValue="default"
              ref={this.genderSelect}
              onChange={(e) => {
                if (this.genderSelect.current) {
                  this.genderSelect.current.value = e.target.value;
                  this.changeHandler(e);
                }
              }}
            >
              <option value="default">---</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </StyledSelect>
          </label>
          <StyledField>
            <legend>
              <h3>Select hobby </h3>
            </legend>
            <StyledCheckBoxWrapper>
              {hobby.map((hobby) => {
                return (
                  <label key={hobby}>
                    <span>{hobby}</span>
                    <input
                      type="checkbox"
                      value={hobby.toLowerCase()}
                      checked={this.hobby.has(hobby.toLowerCase())}
                      onChange={this.hobbyHandler}
                    />
                  </label>
                );
              })}
            </StyledCheckBoxWrapper>
          </StyledField>
          <div>
            <h3>Confirm form data:</h3>
            <SwitchInput
              type="checkbox"
              id="switch"
              name="switch"
              ref={this.switchInput}
              onChange={this.changeHandler}
            />
            <SwitchLabel htmlFor="switch" />
          </div>
          <div>
            <StyledSubmitInput
              id="submit"
              type="submit"
              name="submit"
              disabled={this.state.buttonDisabled}
            />
            <StyledSubmitLabel htmlFor="submit">Submit</StyledSubmitLabel>
          </div>
        </StyledForm>
      </SubmitContext.Provider>
    );
  }
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 33vw;
  margin: 0 auto;
  padding: 2rem;
  border: 5px solid #7c6c4e;
  border-radius: 20px;
`;

const StyledSelect = styled.select`
  width: 80%;
  padding: 2px 20px;
  display: block;
  font-size: 1.2rem;
  height: 2rem;
  border: 3px solid #7c6c4e;
  border-radius: 100px;
  background-color: #d4c7b5;
`;

const StyledField = styled.fieldset`
  width: 80%;
  border: 3px solid #7c6c4e;
  border-radius: 20px;
  padding: 0 20px;
  background-color: #d4c7b5;
`;

const StyledCheckBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding 10px;
  align-items:center;
  & span {
    color: var(--primary-dark);
    font-weight: normal;
  }
  & label {
    display: flex;
    gap: 4px;
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

const StyledSubmitLabel = styled.label`
width:120px;
background: #d4c7b5;
border: 2px solid #7c6c4e;
border-radius: 100px;
padding 10px 20px;
color: var(--primary-dark);
font-weight:bold;
cursor:pointer;

&:active {
  transform: scale(0.6);
}
`;

const StyledSubmitInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
  &:disabled + label {
    background: grey;
    color: var(--primary-light);
  }
  &:active + label {
    transform: scale(0.6);
  }
`;
export default Form;
