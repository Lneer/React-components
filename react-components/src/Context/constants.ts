export interface StoreType {
  page: number;
  pageSize: number;
  pokemonType: string;
  formFields: FormState;
}

export interface FormState {
  name: string;
  nickName: string;
  birthday: string;
  avatar: string;
  gender: string;
  hobby: string[];
  confirm: boolean;
}

const initialFormFields: FormState = {
  name: '',
  nickName: '',
  birthday: '',
  avatar: '',
  gender: 'default',
  hobby: [],
  confirm: false,
};

export const initialState = {
  page: 1,
  pageSize: 20,
  pokemonType: '',
  formFields: initialFormFields,
};
