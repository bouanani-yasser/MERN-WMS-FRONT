import React from 'react';
import {
   BrowserRouter as Router,
   Route,
   Redirect,
   Switch,
} from 'react-router-dom';

import Front from './front/pages/Front';
import Home from './home/pages/Home';

import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import './App.css';

const App = () => {
   const { token, login, logout, userId } = useAuth();

   let routes;

   if (token) {
      routes = (
         <Switch>
            <Route path="/" exact>
               <Front />
            </Route>
            <Route path="/home" exact>
               <Home />
            </Route>

            <Redirect to="/home" />
         </Switch>
      );
   } else {
      routes = (
         <Switch>
            <Route path="/" exact>
               <Front />
            </Route>
            <Route path="/auth">
               <Auth />
            </Route>
            <Redirect to="/" />
         </Switch>
      );
   }

   return (
      <AuthContext.Provider
         value={{
            isLoggedIn: !!token,
            token,
            userId,
            login,
            logout,
         }}
      >
         <Router>
            <MainNavigation />
            <main>{routes}</main>
            {/* <Home /> */}
         </Router>
      </AuthContext.Provider>
   );
};

export default App;
