import { ActionType } from './actions';
import { StoreType } from './constants';

export const paginationReducer = (state: StoreType, action: ActionType) => {
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
