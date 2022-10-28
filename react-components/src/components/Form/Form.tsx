import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SubmitContext } from 'context/SubmitContext';
import { validateConditions } from 'utils/formValidateConditions';
import FormInner from './FormInner';
import { UserData } from 'types/form/userData';

interface FormProps {
  sendCard: (data: UserData) => void;
}

interface FormExtension {
  Item: typeof FormInner;
}

const Form: React.FC<FormProps> & FormExtension = ({ sendCard }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [firstChangeForm, setFirstChangeForm] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [name, setName] = useState<boolean>(false);
  const [nick, setNick] = useState<boolean>(false);
  const [date, setDate] = useState<boolean>(false);
  const [file, setFile] = useState<boolean>(false);
  const [gender, setGender] = useState<boolean>(false);
  const [swap, setSwap] = useState<boolean>(false);
  const [hobby, setHobby] = useState<Set<string>>(new Set(''));

  const nameInput = useRef<HTMLInputElement>();
  const nickNameInput = useRef<HTMLInputElement>();
  const dateInput = useRef<HTMLInputElement>();
  const fileInput = useRef<HTMLInputElement>();
  const switchInput = useRef<HTMLInputElement>();
  const genderSelect = useRef<HTMLSelectElement>();

  useEffect(() => {
    if (!loaded) return;
    if (!firstChangeForm) {
      setButtonDisabled(false);
      return;
    }
    if (name && nick && date && file && gender && swap) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [loaded, name, nick, date, file, gender, swap, firstChangeForm]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    setLoaded(true);
    switch (name) {
      case 'name':
        setName(validateConditions(nameInput));
        break;
      case 'nick':
        setNick(validateConditions(nickNameInput));
        break;
      case 'date':
        setDate(validateConditions(dateInput));
        break;
      case 'file':
        setFile(validateConditions(fileInput));
        break;
      case 'switch':
        setSwap(validateConditions(switchInput));
        break;
      case 'gender':
        setGender(validateConditions(genderSelect));
        break;
      default:
        return;
    }
  };

  const showError = (fieldState: boolean) => {
    return firstChangeForm ? fieldState : true;
  };

  const hobbyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const userHobby = new Set([...hobby]);

    userHobby.has(value) ? userHobby.delete(value) : userHobby.add(value);
    setHobby(userHobby);
    setLoaded(true);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setFirstChangeForm(true);

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
    !nameInput.current ? nameInput.current : (nameInput.current.value = '');
    !nickNameInput.current ? nameInput.current : (nickNameInput.current.value = '');
    !dateInput.current ? nameInput.current : (dateInput.current.value = '');
    !fileInput.current ? nameInput.current : (fileInput.current.value = '');
    !switchInput.current ? nameInput.current : (switchInput.current.checked = false);
    !genderSelect.current ? nameInput.current : (genderSelect.current.value = 'default');
    hobby.clear();
    setName(false);
    setNick(false);
    setDate(false);
    setFile(false);
    setGender(false);
    setSwap(false);
    setButtonDisabled(true);
    setFirstChangeForm(false);
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

// class Form extends Component<SimpleFormProps, SimpleFormState> {
//   static SubmitContext = SubmitContext;
//   static Item = FormInner;

//   nameInput: React.RefObject<HTMLInputElement> = React.createRef();
//   nickNameInput: React.RefObject<HTMLInputElement> = React.createRef();
//   dateInput: React.RefObject<HTMLInputElement> = React.createRef();
//   fileInput: React.RefObject<HTMLInputElement> = React.createRef();
//   switchInput: React.RefObject<HTMLInputElement> = React.createRef();
//   genderSelect: React.RefObject<HTMLSelectElement> = React.createRef();

//   hobby = new Set<string>();

//   defaultState = {
//     firstChangeForm: false,
//     buttonDisabled: true,
//     name: false,
//     nick: false,
//     date: false,
//     file: false,
//     gender: false,
//     switch: false,
//     hobbySelect: true,
//   };

//   state = this.defaultState;

//   changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const name = event.target.name;
//     let currentState: { [key: string]: boolean };

//     switch (name) {
//       case 'name':
//         currentState = { [name]: this.validateConditions(this.nameInput) };
//         break;

//       case 'nick':
//         currentState = { [name]: this.validateConditions(this.nickNameInput) };
//         break;

//       case 'date':
//         currentState = { [name]: this.validateConditions(this.dateInput) };
//         break;

//       case 'file':
//         currentState = { [name]: this.validateConditions(this.fileInput) };
//         break;

//       case 'switch':
//         currentState = { [name]: this.validateConditions(this.switchInput) };
//         break;

//       case 'gender':
//         currentState = { [name]: this.validateConditions(this.genderSelect) };
//         break;

//       default:
//         return;
//     }

//     this.setState((prev) => {
//       return { ...prev, ...currentState };
//     }, this.setSubmitButton);
//   };

//   setSubmitButton = () => {
//     if (!this.state.firstChangeForm) {
//       this.setState((prev) => {
//         return { ...prev, buttonDisabled: false };
//       });
//       return;
//     }

//     if (this.validationAll()) {
//       this.setState({ buttonDisabled: false });
//     } else {
//       this.setState({ buttonDisabled: true });
//     }
//   };

//   validateConditions = validateConditions;

//   isValidComponent = (state: keyof typeof this.state, condition: boolean) => {
//     if (condition) {
//       this.setState((prev) => {
//         return { ...prev, [state]: true };
//       });

//       return true;
//     } else {
//       this.setState((prev) => {
//         return { ...prev, [state]: false };
//       });
//       return false;
//     }
//   };

//   validationAll = () => {
//     const isValid = true;
//     if (
//       isValid &&
//       this.state.name &&
//       this.state.nick &&
//       this.state.date &&
//       this.state.file &&
//       this.state.gender &&
//       this.state.switch
//     ) {
//       return isValid;
//     }
//     return false;
//   };

//   hobbyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value.toLowerCase();
//     this.hobby.has(value) ? this.hobby.delete(value) : this.hobby.add(value);
//     this.setState({ hobbySelect: true });
//     this.setSubmitButton();
//   };

//   showError = (fieldState: boolean) => {
//     return this.state.firstChangeForm ? fieldState : true;
//   };

//   submitHandler = (event: React.FormEvent) => {
//     event.preventDefault();
//     console.log(this.state);

//     this.setState((prev) => {
//       return { ...prev, firstChangeForm: true };
//     });

//     if (!this.validationAll()) {
//       this.setState((prev) => {
//         return { ...prev, buttonDisabled: true };
//       });
//       return;
//     }

//     const userData = {
//       name: this.nameInput.current!.value,
//       nick: this.nickNameInput.current!.value,
//       age: new Date().getFullYear() - new Date(this.dateInput.current!.value).getFullYear(),
//       gender: this.genderSelect.current!.value,
//       img: URL.createObjectURL(this.fileInput.current!.files![0]),
//       hobby: Array.from(this.hobby),
//     };

//     this.props.sendCard(userData);
//     alert('data submited');
//     this.resetStateInputs();
//   };

//   resetStateInputs = () => {
//     !this.nameInput.current ? this.nameInput.current : (this.nameInput.current.value = '');
//     !this.nickNameInput.current ? this.nameInput.current : (this.nickNameInput.current.value = '');
//     !this.dateInput.current ? this.nameInput.current : (this.dateInput.current.value = '');
//     !this.fileInput.current ? this.nameInput.current : (this.fileInput.current.value = '');
//     !this.switchInput.current ? this.nameInput.current : (this.switchInput.current.checked = false);
//     !this.genderSelect.current
//       ? this.nameInput.current
//       : (this.genderSelect.current.value = 'default');
//     this.hobby.clear();
//     this.setState(this.defaultState);
//   };

//   render() {
//     const hobby = ['Basket ball', 'Video games', 'Photo', 'Sport', 'Read book', 'Hand made'];

//     return (
//       <SubmitContext.Provider value={this.changeHandler}>
//         <StyledForm onSubmit={this.submitHandler} data-testid="form">
//           <Form.Item
//             label="Name:"
//             name="name"
//             type="text"
//             reference={this.nameInput}
//             valid={this.showError(this.state.name)}
//             errormassege="The field must contain from 3 to 12 characters"
//             testId="name"
//           />

//           <Form.Item
//             label="Nick name:"
//             name="nick"
//             type="text"
//             reference={this.nickNameInput}
//             valid={this.showError(this.state.nick)}
//             errormassege="The field must contain from 3 to 12 characters"
//             testId="nick"
//           />

//           <Form.Item
//             label="Birth Day:"
//             name="date"
//             type="date"
//             reference={this.dateInput}
//             valid={this.showError(this.state.date)}
//             errormassege="Your age must be between 3 and 100 years old"
//             testId="date"
//           />

//           <Form.Item
//             label="Avatar:"
//             name="file"
//             type="file"
//             reference={this.fileInput}
//             valid={this.showError(this.state.file)}
//             errormassege="Choose you avatar"
//             testId="avatar"
//           />

//           <Form.Item
//             label="Gender: "
//             name="gender"
//             type="select"
//             reference={this.genderSelect}
//             valid={this.showError(this.state.gender)}
//             errormassege="how do you feel"
//             testId="gender"
//           >
//             <option value="default">---</option>
//             <option value="male">male</option>
//             <option value="female">female</option>
//             <option value="other">other</option>
//           </Form.Item>

//           <StyledField>
//             <legend>
//               <h3>Select hobby </h3>
//             </legend>
//             <StyledCheckBoxWrapper data-testid="hobby">
//               {hobby.map((hobby) => {
//                 return (
//                   <label key={hobby}>
//                     <span>{hobby}</span>
//                     <input
//                       type="checkbox"
//                       value={hobby.toLowerCase()}
//                       checked={this.hobby.has(hobby.toLowerCase())}
//                       onChange={this.hobbyHandler}
//                       data-testid={hobby}
//                     />
//                   </label>
//                 );
//               })}
//             </StyledCheckBoxWrapper>
//           </StyledField>

//           <Form.Item
//             label="Confirm data:"
//             name="switch"
//             type="switch"
//             reference={this.switchInput}
//             valid={this.showError(this.state.switch)}
//             errormassege="Check data"
//             testId="check"
//           />

//           <div>
//             <StyledSubmitInput
//               id="submit"
//               type="submit"
//               name="submit"
//               disabled={this.state.buttonDisabled}
//               data-testid="submit"
//             />
//             <StyledSubmitLabel htmlFor="submit">Submit</StyledSubmitLabel>
//           </div>
//         </StyledForm>
//       </SubmitContext.Provider>
//     );
//   }
// }

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
