import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = (props) => {
   const content = (
      <div className={`m ${props.className}`} style={props.style}>
         {props.head && (
            <header className={`m__header ${props.headerClass}`}>
               <h2>{props.header}</h2>
            </header>
         )}
         {/* <form
            onSubmit={
               props.onSubmit
                  ? props.onSubmit
                  : (event) => event.preventDefault()
            }
         > */}
         <div className={`m__content ${props.contentClass}`}>
            {props.children}
         </div>
         {props.footer && (
            <footer className={`m__footer ${props.footerClass}`}>
               {props.footer}
            </footer>
         )}
         {/* </form> */}
      </div>
   );
   return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
   return (
      <React.Fragment>
         {props.show && <Backdrop onClick={props.onCancel} />}
         <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={300}
            classNames="m"
         >
            <ModalOverlay {...props} />
         </CSSTransition>
      </React.Fragment>
   );
};

export default Modal;
