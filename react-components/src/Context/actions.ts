import { FormState } from './constants';

export enum Actions {
  SetPage = 'SET_PAGE',
  SetPageSize = 'SET_PAGE_SIZE',
  setPokemonType = 'SET_POKEMON_TYPE',
  setFormFields = 'SET_FORM_FIELDS',
  setFirstFormChange = 'SET_FIRST_FORM_CHANGE',
}

const inferStringType = <T extends string>(arg: T): T => {
  return arg;
};
export type ActionType =
  | ReturnType<typeof setPage>
  | ReturnType<typeof setPageSize>
  | ReturnType<typeof setPokemonType>
  | ReturnType<typeof setFormField>
  | ReturnType<typeof setFirstFormChange>;

export const setPage = (payload: number) => ({
  type: inferStringType(Actions.SetPage),
  payload: { page: payload },
});

export const setPageSize = (payload: number) => ({
  type: inferStringType(Actions.SetPageSize),
  payload: { pageSize: payload },
});

export const setPokemonType = (payload: string) => ({
  type: inferStringType(Actions.setPokemonType),
  payload: { pokemonType: payload },
});

export const setFormField = (payload: FormState) => ({
  type: inferStringType(Actions.setFormFields),
  payload: { formFields: payload },
});

export const setFirstFormChange = (payload: boolean) => ({
  type: inferStringType(Actions.setFirstFormChange),
  payload: { firstFormChange: payload },
});
