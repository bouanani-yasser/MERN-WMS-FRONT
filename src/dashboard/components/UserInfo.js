import React, { useEffect, useState, useContext } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
const UserInfo = () => {
   const { isLoading, sendRequest } = useHttpClient();
   const [userInfo, setUserInfo] = useState();
   const auth = useContext(AuthContext);

   useEffect(() => {
      const fetchUsersInfo = async () => {
         try {
            const responseData = await sendRequest(
               `${process.env.REACT_APP_BACKEND_URL}users/${auth.userId}`
            );
            setUserInfo(responseData.userInfo);
         } catch (err) {}
      };
      fetchUsersInfo();
   }, [sendRequest, auth]);
   return (
      !!userInfo && (
         <div className="user-info">
            <h5>Your Info</h5>
            <hr style={{ width: '100%' }} />
            {isLoading && <LoadingSpinner asOverlay />}
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
         </div>
      )
   );
};
export default UserInfo;
