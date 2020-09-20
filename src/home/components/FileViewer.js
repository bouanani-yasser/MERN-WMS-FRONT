import React, { useState, useRef, useEffect } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import ConfModal from '../../shared/components/UIElements/ConfModal';
import FileStructure from './FileStructure';
import ItemFile from './ItemFile';
const FileViewer = (props) => {
   const [showOpt, setShowOpt] = useState(false);
   const [corOpt, setCorOpt] = useState({ x: null, y: null });
   const [docId, setDocId] = useState();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showModifyModal, setShowModifyModal] = useState(false);
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
      const id = event.target.parentElement.parentElement.dataset.id;
      setDocId(id);
      const file = props.files.find((file) => file.id === id);
      if (file) props.setFields(file.structure);
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
            let path = props.files.find((file) => file.id === docId).path;
            if (path) window.open(process.env.REACT_APP_STORE + path);
            break;
         case 'Download':
            props.downloadItemHandler(docId);
            break;
         case 'Remove':
            setShowDeleteModal(true);
            break;
         case 'Modify':
            setShowModifyModal(true);
            break;
         default:
            console.log('Sorry , we are out of this Query');
      }
      setShowOpt(false);
   };

   const removeHandler = () => {
      props.removeItemHandler(docId);
   };

   return (
      <div className="files-viewer" ref={pareNode}>
         <ConfModal
            msg="Are you sure you want to delete this file ? "
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            removeHandler={removeHandler}
         />
         <Modal
            show={showModifyModal}
            onCancel={() => {
               setShowModifyModal(false);
               props.setFields(props.fieldsState);
            }}
         >
            <div className="upload-modal">
               <FileStructure
                  fields={props.fields}
                  fieldsChange={props.fieldsChange}
                  setFields={props.setFields}
               />
               <button
                  style={{ margin: '10px' }}
                  className="btn btn-info"
                  onClick={() => {
                     props.updateHandler(docId);
                     setShowModifyModal(false);
                  }}
               >
                  UPDATE
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

export default FileViewer;
