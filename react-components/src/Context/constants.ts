export interface StoreType {
  page: number;
  pageSize: number;
  pokemonType: string;
  formFields: FormState;
  firstFormChange: boolean;
}

export interface FormState {
  storedName: string;
  nickName: string;
  birthday: string;
  avatar: FileList | null;
  storedGender?: string;
  hobby: Set<string>;
  confirm: boolean;
}

const initialFormFields: FormState = {
  storedName: '',
  nickName: '',
  birthday: '',
  avatar: null,
  storedGender: 'default',
  hobby: new Set(''),
  confirm: false,
};

export const initialState = {
  page: 1,
  pageSize: 20,
  pokemonType: '',
  formFields: initialFormFields,
  firstFormChange: false,
};
