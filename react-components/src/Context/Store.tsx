import React, { Dispatch, useReducer } from 'react';
import { paginationReducer, StoreActions } from 'redusers/reduser';

export interface StoreType {
  page: number;
  pageSize: number;
}

const initialState = {
  page: 1,
  pageSize: 20,
};

interface AppProviderProps {
  children: React.ReactNode;
}
export const ContextApp = React.createContext<{
  state: StoreType;
  dispatch: Dispatch<StoreActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  return <ContextApp.Provider value={{ state, dispatch }}>{children}</ContextApp.Provider>;
};
