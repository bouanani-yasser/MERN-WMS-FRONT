import React from 'react';

import Modal from './Modal';

const ErrorModal = (props) => {
   return (
      <Modal
         head
         footer
         onCancel={props.onClear}
         header="An Error Occurred!"
         show={!!props.error}
         footer={
            <button className="btn btn-secondary" onClick={props.onClear}>
               Try again
            </button>
         }
      >
         <p>{props.error}</p>
      </Modal>
   );
};

export default ErrorModal;
