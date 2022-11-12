import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mainPageSlice from './mainPageSlice';
import formSlice from './formSlice';
import apiStateSlice from './apiSlice';

const store = configureStore({
  reducer: {
    mainPage: mainPageSlice,
    form: formSlice,
    api: apiStateSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

interface ReduxStoreProps {
  children: React.ReactNode;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const ReduxProvider: React.FC<ReduxStoreProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
