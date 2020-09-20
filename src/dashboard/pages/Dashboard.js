import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../../shared/components/UIElements/Backdrop';
import user from '../../assets/svg/user.svg';
import list from '../../assets/svg/list.svg';
import New from '../../assets/svg/new.svg';
import settings from '../../assets/svg/settings.svg';
import close from '../../assets/svg/close.svg';
import NewUserForm from '../components/NewUserForm';
import UserInfo from '../components/UserInfo';
import UsersList from '../components/UsersList';

const Dashboard = (props) => {
   const [content, setContent] = useState(<UserInfo />);
   return (
      <React.Fragment>
         {props.show && <Backdrop onClick={props.onCancel} />}
         <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={300}
            classNames="dashboard"
         >
            <section className="dashboard">
               <div className="btn-close" onClick={props.onCancel}>
                  <img src={close} alt="close" />
               </div>
               <aside className="menu">
                  <ul className="item-list">
                     <li
                        className="item"
                        onClick={() => setContent(<UserInfo />)}
                     >
                        <label>
                           <img src={user} alt="user" />
                        </label>
                        Account
                     </li>
                     <li
                        className="item"
                        onClick={() =>
                           setContent(
                              <NewUserForm
                                 setContent={setContent}
                                 setShow={props.setShow}
                              />
                           )
                        }
                     >
                        <label>
                           <img src={New} alt="new" />
                        </label>
                        New
                     </li>
                     <li
                        className="item"
                        onClick={() => setContent(<UsersList />)}
                     >
                        <label>
                           <img src={list} alt="list" />
                        </label>
                        Users
                     </li>
                     <li className="item" onClick={() => setContent(Settings)}>
                        <label>
                           <img src={settings} alt="setting" />
                        </label>
                        Setting
                     </li>
                  </ul>
               </aside>
               <section className="main">{content}</section>
            </section>
         </CSSTransition>
      </React.Fragment>
   );
};

const Settings = () => (
   <div>
      <h1>Setting</h1>
   </div>
);

export default Dashboard;
