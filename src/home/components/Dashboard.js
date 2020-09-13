import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../../shared/components/UIElements/Backdrop';
import user from '../../assets/svg/user.svg';
import list from '../../assets/svg/list.svg';
import New from '../../assets/svg/new.svg';
import settings from '../../assets/svg/settings.svg';
import close from '../../assets/svg/close.svg';

const Dashboard = (props) => {
   const [content, setContent] = useState();

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
                     <li className="item" onClick={() => setContent(Acount)}>
                        <label>
                           <img src={user} alt="user" />
                        </label>
                        Acount
                     </li>
                     <li className="item" onClick={() => setContent(ListUser)}>
                        <label>
                           <img src={list} alt="list" />
                        </label>
                        Users
                     </li>
                     <li className="item" onClick={() => setContent(NewUser)}>
                        <label>
                           <img src={New} alt="new" />
                        </label>
                        New
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

const Acount = () => (
   <div>
      <h1>Acount</h1>
   </div>
);
const ListUser = () => (
   <div>
      <h1>ListUser</h1>
   </div>
);
const NewUser = () => (
   <div>
      <h1>NewUser</h1>
   </div>
);
const Settings = () => (
   <div>
      <h1>Setting</h1>
   </div>
);

export default Dashboard;
