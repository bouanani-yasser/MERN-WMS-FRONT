import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ConfModal from '../../shared/components/UIElements/ConfModal';
import UserForm from './NewUserForm';

const UsersList = (props) => {
   const auth = useContext(AuthContext);
   const { isLoading, sendRequest } = useHttpClient();
   const [usersList, setUsersList] = useState();
   const [deletedUserId, setDeletedUserId] = useState();
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const fetchUsersList = useCallback(async () => {
      try {
         const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}users/list/${auth.userId}`
         );
         setUsersList(responseData.usersList);
      } catch (err) {}
   }, [auth, sendRequest]);

   useEffect(() => {
      fetchUsersList();
   }, [fetchUsersList]);

   const removeHandler = async () => {
      try {
         await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}users/list/${deletedUserId}`,
            'DELETE'
         );
         fetchUsersList();
      } catch (err) {}
   };

   return (
      <React.Fragment>
         <ConfModal
            msg="Are you sure you want to delete this user ? "
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            removeHandler={removeHandler}
         />
         {!!usersList && (
            <div className="users-list">
               <h5>Users List</h5>
               <hr style={{ width: '100%' }} />
               {isLoading && <LoadingSpinner asOverlay />}
               {usersList.length === 0 && (
                  <h5>You don't have any users yet .</h5>
               )}
               {usersList.map((user, index) => (
                  <ListItem
                     key={index}
                     user={user}
                     setShow={setShowDeleteModal}
                     setDeletedUserId={setDeletedUserId}
                     fetchUsersList={fetchUsersList}
                     id={user.id}
                  />
               ))}
            </div>
         )}
      </React.Fragment>
   );
};

export default UsersList;

const ListItem = (props) => {
   const [showUserForm, setShowUserForm] = useState(false);

   return (
      <div className="user-wrap">
         <div className="user-item">
            <div className="info">
               <label>{props.user.name}</label>
               <label style={{ color: '#aaa' }}>({props.user.role})</label>
            </div>
            <div className="btns">
               <button
                  className="btn btn-warning"
                  onClick={() => setShowUserForm((prev) => !prev)}
               >
                  Edit
               </button>
               <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                     props.setShow(true);
                     props.setDeletedUserId(props.id);
                  }}
               >
                  Remove
               </button>
            </div>
         </div>
         <CSSTransition
            in={showUserForm}
            mountOnEnter
            unmountOnExit
            timeout={300}
            classNames="user-form"
         >
            <UserForm
               user={props.user}
               reloadList={props.fetchUsersList}
               setShow={setShowUserForm}
            />
         </CSSTransition>
      </div>
   );
};
