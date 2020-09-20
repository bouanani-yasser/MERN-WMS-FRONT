import { createContext } from 'react';

export const AuthContext = createContext({
   isLoggedIn: false,
   userId: null,
   userRole: null,
   token: null,
   login: () => {},
   logout: () => {},
});
