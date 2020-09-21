import React, { useEffect, useState, useContext, useCallback } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ConfModal from '../../shared/components/UIElements/ConfModal';
import UserForm from './NewUserForm';
const UserInfo = () => {
   const { isLoading, sendRequest } = useHttpClient();
   const [userInfo, setUserInfo] = useState();
   const auth = useContext(AuthContext);
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const fetchUsersInfo = useCallback(async () => {
      try {
         const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}users/${auth.userId}`
         );
         setUserInfo(responseData.userInfo);
      } catch (err) {}
   }, [sendRequest, auth]);

   useEffect(() => {
      fetchUsersInfo();
   }, [fetchUsersInfo]);

   const removeHandler = async () => {
      try {
         await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}users/list/${auth.userId}`,
            'DELETE'
         );
         auth.logout();
      } catch (err) {}
   };
   return (
      !!userInfo && (
         <React.Fragment>
            <ConfModal
               msg="Are you sure you want to delete your Account ? "
               show={showDeleteModal}
               setShow={setShowDeleteModal}
               removeHandler={removeHandler}
            />
            <div className="user-account">
               {isLoading && <LoadingSpinner asOverlay />}
               <h5>Your Info</h5>
               <hr style={{ width: '100%' }} />
               <div className="user-info">
                  <div className="item">
                     <label className="key">Name</label>
                     <label>{userInfo.name}</label>
                  </div>
                  <div className="item">
                     <label className="key">Email</label>
                     <label>{userInfo.email}</label>
                  </div>
                  <div className="item">
                     <label className="key">ID</label>
                     <label>{userInfo.id}</label>
                  </div>

                  <div className="item">
                     <label className="key">Role</label>
                     <label>{userInfo.role}</label>
                  </div>
               </div>{' '}
               <hr style={{ width: '100%' }} />
               <h5>Update Account</h5>
               <hr style={{ width: '100%' }} />
               <UserForm user={userInfo} admin reloadList={fetchUsersInfo} />
               <hr style={{ width: '100%' }} />
               <h5>Remove Account</h5>
               <hr style={{ width: '100%' }} />
               <button
                  className="btn btn-outline-danger"
                  onClick={() => setShowDeleteModal(true)}
               >
                  Remove My Account
               </button>
            </div>
         </React.Fragment>
      )
   );
};
export default UserInfo;
