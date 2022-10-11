import React, { Component } from 'react';
import styled from 'styled-components';

type UserData = {
  name: string | undefined;
  nickName: string | undefined;
  date: string | undefined;
};

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
}

class SimpleForm extends Component<SimpleFormProps, SimpleFormState> {
  nameInput: React.RefObject<HTMLInputElement> = React.createRef();
  nickNameInput: React.RefObject<HTMLInputElement> = React.createRef();
  dateInput: React.RefObject<HTMLInputElement> = React.createRef();
  fileInput: React.RefObject<HTMLInputElement> = React.createRef();
  genderSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  state = {
    firstChangeForm: false,
    buttonDisabled: true,
    name: true,
    nick: true,
    date: true,
    file: true,
    gender: true,
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    console.log(name);

    this.setState((prev) => {
      return { ...prev, [name]: true };
    }, this.enableButton);
  };

  enableButton = () => {
    if (
      this.state.name &&
      this.state.nick &&
      this.state.date &&
      this.state.file &&
      !this.state.firstChangeForm
    ) {
      this.setState((prev) => {
        return { ...prev, buttonDisabled: false };
      });
    }
  };

  validateConditions = (
    checkingRef: React.RefObject<HTMLInputElement | HTMLSelectElement>
  ): boolean => {
    if (!checkingRef.current) {
      return false;
    }

    if (checkingRef.current instanceof HTMLSelectElement) {
      checkingRef.current.value === 'default' ? false : true;
    } else {
      if (checkingRef.current.type) {
        switch (checkingRef.current.type) {
          case 'text':
            checkingRef.current.value.length > 3 ? true : false;
            break;

          case 'date':
            {
              const date = new Date(checkingRef.current.value).getFullYear();
              const now = new Date().getFullYear();
              Number(now) - Number(date) > 5 && Number(now) - Number(date) < 100 ? true : false;
            }
            break;

          case 'email':
            {
              const emailRegx = /^[a-zA-Z0-9._-]{2,16}@[a-zA-Z0-9.-]{2,16}\.[a-zA-Z]{2,6}$/;
              emailRegx.test(checkingRef.current.value) ? true : false;
            }
            break;

          case 'file':
            {
              checkingRef.current.files?.length ? true : false;
            }
            break;

          default:
            return false;
        }
      }
    }

    return false;
  };

  isValidComponent = (state: keyof typeof this.state, condition: boolean) => {
    if (condition) {
      this.setState((prev) => {
        return { ...prev, [state]: false };
      });

      return false;
    } else {
      this.setState((prev) => {
        return { ...prev, [state]: true };
      });
      return true;
    }
  };

  validationAll = () => {
    let isValid = true;
    isValid = this.isValidComponent('name', this.validateConditions(this.nameInput)) && isValid;
    isValid = this.isValidComponent('nick', this.validateConditions(this.nickNameInput)) && isValid;
    isValid = this.isValidComponent('date', this.validateConditions(this.dateInput)) && isValid;
    isValid = this.isValidComponent('file', this.validateConditions(this.fileInput)) && isValid;
    return isValid;
  };

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const userData = {
      name: this.nameInput.current?.value,
      nickName: this.nickNameInput.current?.value,
      date: this.dateInput.current?.value,
    };

    this.setState({ firstChangeForm: true });

    if (this.validationAll()) {
      this.setState({ buttonDisabled: false });
      return;
    }

    this.props.sendCard(userData);
    this.resetStateInputs();
  };

  resetStateInputs = () => {
    const inputName = this.nameInput.current;

    !inputName ? inputName : (inputName.value = '');
  };

  render() {
    const hobby = [
      'Basket ball',
      'Yoga',
      'Video games',
      'Photo',
      'Sport',
      'Read book',
      'Hand made',
    ];
    return (
      <StyledForm onSubmit={this.submitHandler}>
        <label>
          <h3>Name:</h3>
          <StyledInputWrapper>
            <StyledInput
              name="name"
              type="text"
              ref={this.nameInput}
              onChange={this.changeHandler}
            />
          </StyledInputWrapper>
        </label>
        <label>
          <h3>NickName:</h3>
          <StyledInputWrapper>
            <StyledInput
              name="nickName"
              type="text"
              ref={this.nickNameInput}
              onChange={this.changeHandler}
            />
          </StyledInputWrapper>
        </label>
        <label>
          <h3>Birth Day:</h3>
          <StyledInputWrapper>
            <StyledInput name="date" type="date" ref={this.dateInput} />
          </StyledInputWrapper>
        </label>

        <label>
          <h3>Avatar:</h3>
          <StyledInputWrapper>
            <StyledFileInput name="file" type="file" ref={this.dateInput} />
          </StyledInputWrapper>
        </label>
        <label>
          <h3>Select gender:</h3>
          <StyledSelect name="gender" defaultValue="default">
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
                  <input type="checkbox" value={hobby.toLowerCase()} />
                </label>
              );
            })}
          </StyledCheckBoxWrapper>
        </StyledField>
        <div>
          <h3>Confirm form data:</h3>
          <SwitchInput type="checkbox" id="switch" />
          <SwitchLabel htmlFor="switch" />
        </div>
        <div>
          <StyledSubmitInput
            disabled={this.state.buttonDisabled}
            id="submit"
            type="submit"
            name="submit"
            onClick={() => console.log('123')}
          />
          <StyledSubmitLabel htmlFor="submit">Submit</StyledSubmitLabel>
        </div>
      </StyledForm>
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

const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  background: none;
  border: none;
  padding: 0 10px;
  outline: 0;
`;

const StyledFileInput = styled.input`
  width: 70%;
  font-size: 1rem;
  background: none;
  border: none;

  padding: 2px 10px;
  outline: 0;
`;

const StyledInputWrapper = styled.div`
  width: 80%;
  border: 3px solid #7c6c4e;
  border-radius: 100px;
  background-color: #d4c7b5;
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
`;
export default SimpleForm;
