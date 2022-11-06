import { StoreType } from 'context/Store';

export enum Types {
  SetPage = 'SET_PAGE',
  SetPageSize = 'SET_PAGE_SIZE',
  setPokemonType = 'SET_POKEMON_TYPE',
}

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
  [Types.SetPage]: {
    page: number;
  };

  [Types.SetPageSize]: {
    pageSize: number;
  };

  [Types.setPokemonType]: {
    pokemonType: string;
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
    default:
      return state;
  }
};
