import React from 'react';

import Modal from './Modal';

const ErrorModal = (props) => {
   return (
      <Modal
         head
         foot
         onCancel={props.onClear}
         header="An Error Occurred!"
         show={!!props.error}
         footer={
            <button className="btn btn-secondary" onClick={props.onClear}>
               Try again
            </button>
         }
      >
         {props.error && <p>{props.error.message}</p>}
      </Modal>
   );
};

export default ErrorModal;
