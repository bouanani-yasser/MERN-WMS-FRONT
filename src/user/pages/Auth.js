import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
   VALIDATOR_EMAIL,
   VALIDATOR_MINLENGTH,
   VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
   const auth = useContext(AuthContext);
   const [isLoginMode, setIsLoginMode] = useState(true);
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const [formState, inputHandler, setFormData] = useForm(
      {
         email: {
            value: '',
            isValid: false,
         },
         password: {
            value: '',
            isValid: false,
         },
      },
      false
   );

   const switchModeHandler = (event) => {
      if (!isLoginMode) {
         if (event.target.textContent === 'Login') setIsLoginMode(true);
         setFormData(
            {
               ...formState.inputs,
               name: undefined,
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid
         );
      } else {
         if (event.target.textContent === 'Signup') setIsLoginMode(false);
         setFormData(
            {
               ...formState.inputs,
               name: {
                  value: '',
                  isValid: false,
               },
            },
            true
         );
      }
      // setIsLoginMode((prevMode) => !prevMode);
   };

   const authSubmitHandler = async (event) => {
      event.preventDefault();

      if (isLoginMode) {
         try {
            const responseData = await sendRequest(
               'http://localhost:5000/api/users/login',
               'POST',
               JSON.stringify({
                  email: formState.inputs.email.value,
                  password: formState.inputs.password.value,
               }),
               {
                  'Content-Type': 'application/json',
               }
            );
            auth.login(responseData.userId, responseData.token);
         } catch (err) {}
      } else {
         try {
            const responseData = await sendRequest(
               'http://localhost:5000/api/users/signup',
               'POST',
               JSON.stringify({
                  name: formState.inputs.name.value,
                  email: formState.inputs.email.value,
                  password: formState.inputs.password.value,
               }),
               {
                  'Content-Type': 'application/json',
               }
            );
            auth.login(responseData.userId, responseData.token);
         } catch (err) {}
      }
   };

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         <div className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <label
               className={isLoginMode && 'active'}
               onClick={switchModeHandler}
               value="L"
            >
               Login
            </label>
            <label
               className={!isLoginMode && 'active'}
               onClick={switchModeHandler}
               value="S"
            >
               Signup
            </label>
            <form onSubmit={authSubmitHandler}>
               {!isLoginMode && (
                  <Input
                     element="input"
                     id="name"
                     type="text"
                     placeholder="Your Name"
                     validators={[VALIDATOR_REQUIRE()]}
                     errorText="Please enter your name."
                     onInput={inputHandler}
                  />
               )}

               <Input
                  element="input"
                  id="email"
                  type="email"
                  placeholder="E-Mail"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid email address."
                  onInput={inputHandler}
               />
               <Input
                  element="input"
                  id="password"
                  type="password"
                  placeholder="Password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Please enter a valid password, at least 6 characters."
                  onInput={inputHandler}
               />
               <div style={{ textAlign: 'center' }}>
                  <Button type="submit" disabled={!formState.isValid}>
                     {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                  </Button>
               </div>
            </form>
         </div>
      </React.Fragment>
   );
};

export default Auth;
