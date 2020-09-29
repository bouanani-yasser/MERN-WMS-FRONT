import React, { useRef, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';

import {
   VALIDATOR_EMAIL,
   VALIDATOR_MINLENGTH,
   VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import UsersList from './UsersList';

const NewUserForm = (props) => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const role = useRef();
   const auth = useContext(AuthContext);
   const { user } = props;

   const [formState, inputHandler] = useForm(
      {
         name: {
            value: '',
            isValid: false,
         },
         email: {
            value: '',
            isValid: false,
         },
      },
      false
   );

   const authSubmitHandler = async (event) => {
      try {
         let url;
         user
            ? (url = `${process.env.REACT_APP_BACKEND_URL}users/update-user`)
            : (url = `${process.env.REACT_APP_BACKEND_URL}users/add-user`);
         const responseData = await sendRequest(
            url,
            'POST',
            JSON.stringify({
               id: user && user.id,
               name: formState.inputs.name.value,
               email: formState.inputs.email.value,
               password: !user && formState.inputs.password.value,
               role: !props.admin && role.current.value,
               administrator: auth.userId,
            }),
            {
               'Content-Type': 'application/json',
            }
         );
         if (responseData && !user) {
            props.setContent(<UsersList />);
         } else if (responseData && user) {
            !props.admin && props.setShow(false);
            setTimeout(() => {
               props.reloadList();
            }, 1000);
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         <div className="new-user-form user-form">
            {!props.user && (
               <React.Fragment>
                  <h5>Add New User</h5>
                  <hr style={{ width: '100%' }} />
               </React.Fragment>
            )}
            {!user && isLoading && <LoadingSpinner asOverlay />}
            {/* <form autoComplete="off" onSubmit={authSubmitHandler}> */}
            {auth.userRole === 'admin' || user ? (
               <React.Fragment>
                  <Input
                     element="input"
                     id="name"
                     initialValue={user ? user.name : ''}
                     initialValid={!!user}
                     type="text"
                     placeholder="User Name"
                     validators={[VALIDATOR_REQUIRE()]}
                     errorText="Please enter user's name."
                     onInput={inputHandler}
                  />
                  {!props.admin && (
                     <select ref={role} className="custom-select">
                        <option defaultValue value={user ? user.role : 'admin'}>
                           {user ? user.role : 'admin'}
                        </option>
                        <option
                           value={
                              user
                                 ? user.role === 'admin'
                                    ? 'user'
                                    : 'admin'
                                 : 'user'
                           }
                        >
                           {user
                              ? user.role === 'admin'
                                 ? 'user'
                                 : 'admin'
                              : 'user'}
                        </option>
                     </select>
                  )}
                  {/* this form tag for disabling autoComplete attribute in Inputs  */}
                  <form>
                     <Input
                        element="input"
                        id="email"
                        initialValue={user ? user.email : ''}
                        initialValid={!!user}
                        type="email"
                        placeholder="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                     />
                  </form>
                  {!user && (
                     <form>
                        <Input
                           element="input"
                           id="password"
                           type="password"
                           placeholder="Password"
                           validators={[VALIDATOR_MINLENGTH(6)]}
                           errorText="Please enter a valid password, at least 6 characters."
                           onInput={inputHandler}
                        />
                     </form>
                  )}
                  <div style={{ textAlign: 'center' }}>
                     <Button
                        type="button"
                        onClick={authSubmitHandler}
                        disabled={!formState.isValid}
                     >
                        {props.user ? 'Update User' : 'Add User'}
                     </Button>
                  </div>
               </React.Fragment>
            ) : (
               <h5>Sorry, you must be an Admin to have this options.</h5>
            )}
            {/* </form> */}
         </div>
      </React.Fragment>
   );
};

export default NewUserForm;
