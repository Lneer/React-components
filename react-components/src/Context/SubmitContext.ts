import React from 'react';

export const SubmitContext = React.createContext(
  (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();
  }
);
