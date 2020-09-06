import React, { useState, useRef, useEffect } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import ItemFile from './ItemFile';
const FileViwer = (props) => {
   const [showOpt, setShowOpt] = useState(false);
   const [corOpt, setCorOpt] = useState({ x: null, y: null });
   const [docId, setDocId] = useState();
   const [showModal, setShowModal] = useState(false);
   const Node = useRef();
   const pareNode = useRef();

   useEffect(() => {
      document.addEventListener('mousedown', handleClick, false);

      return () => {
         document.removeEventListener('mousedown', handleClick, false);
      };
   }, []);

   const handleClick = (event) => {
      if (!!Node.current) {
         if (Node.current.contains(event.target)) {
            return;
         }
      }

      setShowOpt(false);
   };

   const showOptHandler = (event) => {
      setDocId(event.target.parentElement.parentElement.dataset.id);
      const pareCor = pareNode.current.getBoundingClientRect();
      const cor = event.target.getBoundingClientRect();
      let X = cor.left - 50;
      let Y = cor.top - 150;
      if (X + 200 > pareCor.width) {
         X = cor.left - 150;
      }

      if (Y + 200 > pareCor.height) {
         Y = cor.top - 250;
      }
      setCorOpt({ x: X, y: Y });
      setShowOpt((prev) => !prev);
   };

   const optionQueryHandler = (event) => {
      const query = event.target.textContent;
      switch (query) {
         case 'Preview':
            console.log('preview : ' + docId);
            break;
         case 'Download':
            props.downloadItemHandler(docId);
            break;
         case 'Remove':
            setShowModal(true);
            break;
         case 'Modify':
            console.log('Modify');
            break;
         default:
            console.log('Sorry , we are out of this Query');
      }
      setShowOpt(false);
   };

   return (
      <div className="files-viwer" ref={pareNode}>
         <Modal show={showModal} onCancel={() => setShowModal(false)}>
            <h5>are you sure you want to delete this file ?</h5>
            <div className="center">
               <button
                  type="button"
                  className="btn btn-danger"
                  style={{ margin: '10px 20px' }}
                  onClick={() => {
                     props.removeItemHandler(docId);
                     setShowModal(false);
                  }}
               >
                  Delete
               </button>
               <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ margin: '10px 20px' }}
                  onClick={() => {
                     setShowModal(false);
                  }}
               >
                  Cancel
               </button>
            </div>
         </Modal>
         {showOpt && (
            <div
               ref={Node}
               className="option"
               style={{ top: corOpt.y + 'px', left: corOpt.x + 'px' }}
            >
               <ul>
                  <li onClick={optionQueryHandler}>Preview</li>
                  <li onClick={optionQueryHandler}>Download</li>
                  <li onClick={optionQueryHandler}>Remove</li>
                  <li onClick={optionQueryHandler}>Modify</li>
               </ul>
            </div>
         )}
         {props.loading && <LoadingSpinner asOverlay />}
         {!props.loading &&
            props.files.length !== 0 &&
            Array.from(props.files).map((file, index) => (
               <ItemFile
                  key={index}
                  id={file.id}
                  path={file.path}
                  showOpt={showOptHandler}
               />
            ))}
         {!props.loading && props.files.length === 0 && !props.search && (
            <div className="center">
               <p>You don't have any files yet,Please UPLOAD files.</p>
            </div>
         )}

         {!props.loading && props.files.length === 0 && props.search && (
            <div className="center">
               <p>
                  You don't have any files match <strong>{props.search}</strong>
               </p>
            </div>
         )}
      </div>
   );
};

export default FileViwer;
