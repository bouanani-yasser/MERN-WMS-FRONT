import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
   const auth = useContext(AuthContext);

   return (
      <div className="all-nav">
         <ul className="nav-links">
            <li>
               <NavLink to="/" exact>
                  HOME
               </NavLink>
            </li>

            <li>
               <NavLink to="s/#services" exact>
                  SERVICES
               </NavLink>
            </li>
            <li>
               <NavLink to="s/#about">ABOUT</NavLink>
            </li>
            <li>
               <NavLink to="s/#contact">CONTACT</NavLink>
            </li>
         </ul>

         <ul className="auth-links">
            {!auth.isLoggedIn && (
               <li className="login">
                  <NavLink to="/auth">LOGIN</NavLink>
               </li>
            )}
            {!auth.isLoggedIn && (
               <li>
                  <NavLink to="/auth">SIGNUP</NavLink>
               </li>
            )}
            {auth.isLoggedIn && (
               <li>
                  <button
                     className="btn btn-outline-danger"
                     style={{ fontWeight: 'bold' }}
                     onClick={auth.logout}
                  >
                     LOGOUT
                  </button>
               </li>
            )}
         </ul>
      </div>
   );
};

export default NavLinks;
