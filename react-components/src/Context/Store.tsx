import React, { Dispatch, useReducer } from 'react';
import { paginationReducer, StoreActions } from 'context/reduser';
import { initialState, StoreType } from './constants';

export const ContextApp = React.createContext<{
  state: StoreType;
  dispatch: Dispatch<StoreActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  return <ContextApp.Provider value={{ state, dispatch }}>{children}</ContextApp.Provider>;
};
