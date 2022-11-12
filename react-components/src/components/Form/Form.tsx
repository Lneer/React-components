import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SubmitContext } from 'context/SubmitContext';
import { validateConditions } from 'utils/formValidateConditions';
import FormInner from './FormInner';
import { UserData } from 'types/form/userData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reduxStore/store';
import { changeFirstFormChange, changeFormField } from 'reduxStore/formSlice';

interface FormProps {
  sendCard: (data: UserData) => void;
}

interface FormExtension {
  Item: typeof FormInner;
}

const Form: React.FC<FormProps> & FormExtension = ({ sendCard }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [name, setName] = useState<boolean>(false);
  const [nick, setNick] = useState<boolean>(false);
  const [date, setDate] = useState<boolean>(false);
  const [file, setFile] = useState<boolean>(false);
  const [gender, setGender] = useState<boolean>(false);
  const [swap, setSwap] = useState<boolean>(false);

  const nameInput = useRef<HTMLInputElement>();
  const nickNameInput = useRef<HTMLInputElement>();
  const dateInput = useRef<HTMLInputElement>();
  const fileInput = useRef<HTMLInputElement>();
  const switchInput = useRef<HTMLInputElement>();
  const genderSelect = useRef<HTMLSelectElement>();

  const state = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const { storedName, nickName, birthday, avatar, confirm, storedGender, hobby } = state.formFields;
  const { firstFormChange } = state;

  useEffect(() => {
    if (!loaded) return;

    if (!firstFormChange) {
      setButtonDisabled(false);
      return;
    }

    if (name && nick && date && file && gender && swap) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [loaded, name, nick, date, file, gender, swap, firstFormChange]);

  useLayoutEffect(() => {
    if (
      nameInput.current &&
      nickNameInput.current &&
      dateInput.current &&
      fileInput.current &&
      switchInput.current &&
      genderSelect.current
    ) {
      nameInput.current.value = storedName || '';
      nickNameInput.current.value = nickName || '';
      dateInput.current.value = birthday || '';
      fileInput.current.files = avatar || null;
      switchInput.current.checked = confirm || false;
      genderSelect.current.value = storedGender || 'default';
    }
  }, [storedName, nickName, birthday, avatar, confirm, storedGender]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;

    setLoaded(true);

    switch (name) {
      case 'name':
        setName(validateConditions(nameInput));
        dispatch(changeFormField({ ...state.formFields, storedName: nameInput.current!.value }));
        break;

      case 'nick':
        setNick(validateConditions(nickNameInput));
        dispatch(changeFormField({ ...state.formFields, nickName: nickNameInput.current!.value }));
        break;

      case 'date':
        setDate(validateConditions(dateInput));
        dispatch(changeFormField({ ...state.formFields, birthday: dateInput.current!.value }));
        break;

      case 'file':
        setFile(validateConditions(fileInput));
        dispatch(changeFormField({ ...state.formFields, avatar: fileInput.current!.files }));
        break;

      case 'switch':
        dispatch(changeFormField({ ...state.formFields, confirm: switchInput.current!.checked }));
        setSwap(validateConditions(switchInput));
        break;

      case 'gender':
        setGender(validateConditions(genderSelect));
        dispatch(
          changeFormField({ ...state.formFields, storedGender: genderSelect.current!.value })
        );
        break;
      default:
        return;
    }
  };

  const showError = (fieldState: boolean) => {
    return firstFormChange ? fieldState : true;
  };

  const hobbyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const userHobby = new Set([...hobby]);

    userHobby.has(value) ? userHobby.delete(value) : userHobby.add(value);
    dispatch(changeFormField({ ...state.formFields, hobby: userHobby }));
    setLoaded(true);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(changeFirstFormChange(true));

    const userData = {
      name: nameInput.current!.value,
      nick: nickNameInput.current!.value,
      age: new Date().getFullYear() - new Date(dateInput.current!.value).getFullYear(),
      gender: genderSelect.current!.value,
      img: URL.createObjectURL(fileInput.current!.files![0]),
      hobby: Array.from(hobby),
    };

    sendCard(userData);
    alert('data submited');
    resetStateInputs();
  };

  const resetStateInputs = () => {
    dispatch(
      changeFormField({
        storedName: '',
        nickName: '',
        birthday: '',
        avatar: null,
        storedGender: 'default',
        hobby: new Set(''),
        confirm: false,
      })
    );

    dispatch(changeFirstFormChange(false));
    setName(false);
    setNick(false);
    setDate(false);
    setFile(false);
    setGender(false);
    setSwap(false);
    setButtonDisabled(true);
    setLoaded(false);
  };
  const userHobbies = ['Basket ball', 'Video games', 'Photo', 'Sport', 'Read book', 'Hand made'];
  return (
    <SubmitContext.Provider value={changeHandler}>
      <StyledForm onSubmit={submitHandler} data-testid="form">
        <Form.Item
          label="Name:"
          name="name"
          type="text"
          reference={nameInput}
          valid={showError(name)}
          errormassege="The field must contain from 3 to 12 characters"
          testId="name"
        />

        <Form.Item
          label="Nick name:"
          name="nick"
          type="text"
          reference={nickNameInput}
          valid={showError(nick)}
          errormassege="The field must contain from 3 to 12 characters"
          testId="nick"
        />

        <Form.Item
          label="Birth Day:"
          name="date"
          type="date"
          reference={dateInput}
          valid={showError(date)}
          errormassege="Your age must be between 3 and 100 years old"
          testId="date"
        />

        <Form.Item
          label="Avatar:"
          name="file"
          type="file"
          reference={fileInput}
          valid={showError(file)}
          errormassege="Choose you avatar"
          testId="avatar"
        />

        <Form.Item
          label="Gender: "
          name="gender"
          type="select"
          reference={genderSelect}
          valid={showError(gender)}
          errormassege="how do you feel"
          testId="gender"
        >
          <option value="default">---</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </Form.Item>

        <StyledField>
          <legend>
            <h3>Select hobby </h3>
          </legend>
          <StyledCheckBoxWrapper data-testid="hobby">
            {userHobbies.map((userHobby) => {
              return (
                <label key={userHobby}>
                  <span>{userHobby}</span>
                  <input
                    type="checkbox"
                    value={userHobby.toLowerCase()}
                    checked={hobby.has(userHobby.toLowerCase())}
                    onChange={hobbyHandler}
                    data-testid={userHobby}
                  />
                </label>
              );
            })}
          </StyledCheckBoxWrapper>
        </StyledField>

        <Form.Item
          label="Confirm data:"
          name="switch"
          type="switch"
          reference={switchInput}
          valid={showError(swap)}
          errormassege="Check data"
          testId="check"
        />

        <div>
          <StyledSubmitInput
            id="submit"
            type="submit"
            name="submit"
            disabled={buttonDisabled}
            data-testid="submit"
          />
          <StyledSubmitLabel htmlFor="submit">Submit</StyledSubmitLabel>
        </div>
      </StyledForm>
    </SubmitContext.Provider>
  );
};

Form.Item = FormInner;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 33vw;
  margin: 0 auto;
  padding: 2rem;
  border: 5px solid #7c6c4e;
  border-radius: 20px;
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
