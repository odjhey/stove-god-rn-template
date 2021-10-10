import React from 'react';

export type TAuthContext = {
  signIn: Function;
  signOut: Function;
};

const NotImplementedError = new Error('Not Implemented.');
const defaultContext = {
  signIn: () => {
    throw NotImplementedError;
  },
  signOut: () => {
    throw NotImplementedError;
  },
};

export const AuthContext = React.createContext<TAuthContext>(defaultContext);
