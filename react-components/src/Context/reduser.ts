import { Actions } from './actions';
import { FormState, StoreType } from './constants';

type ActionMap<M> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

interface StorePayloads {
  [Actions.SetPage]: {
    page: number;
  };

  [Actions.SetPageSize]: {
    pageSize: number;
  };

  [Actions.setPokemonType]: {
    pokemonType: string;
  };

  [Actions.setFormFields]: {
    formFields: FormState;
  };

  [Actions.setFirstFormChange]: {
    firstFormChange: boolean;
  };
}

export type StoreActions = ActionMap<StorePayloads>[keyof ActionMap<StorePayloads>];

export const paginationReducer = (state: StoreType, action: StoreActions) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload.page,
      };

    case 'SET_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.payload.pageSize,
      };

    case 'SET_POKEMON_TYPE':
      return {
        ...state,
        pokemonType: action.payload.pokemonType,
      };

    case 'SET_FORM_FIELDS':
      return {
        ...state,
        formFields: action.payload.formFields,
      };

    case 'SET_FIRST_FORM_CHANGE':
      return {
        ...state,
        firstFormChange: action.payload.firstFormChange,
      };
    default:
      return state;
  }
};
