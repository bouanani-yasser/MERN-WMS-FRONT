import React from 'react';

import Modal from './Modal';

const ConfModal = (props) => {
   return (
      <Modal withBack show={props.show} onCancel={() => props.setShow(false)}>
         <h5 style={{ color: '#666' }}>{props.msg}</h5>
         <div className="center">
            <button
               type="button"
               className="btn btn-danger"
               style={{ margin: '10px 20px' }}
               onClick={() => {
                  props.removeHandler();
                  props.setShow(false);
               }}
            >
               Delete
            </button>
            <button
               type="button"
               className="btn btn-secondary"
               style={{ margin: '10px 20px' }}
               onClick={() => {
                  props.setShow(false);
               }}
            >
               Cancel
            </button>
         </div>
      </Modal>
   );
};

export default ConfModal;
