import { StoreType } from 'context/Store';

export enum Types {
  SetPage = 'SET_PAGE',
  SetPageSize = 'SET_PAGE_SIZE',
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
    default:
      return state;
  }
};
