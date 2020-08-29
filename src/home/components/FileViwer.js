import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ItemFile from './ItemFile';
const FileViwer = (props) => {
   const [showOpt, setShowOpt] = useState(false);
   const [corOpt, setCorOpt] = useState({ x: null, y: null });
   const [Node, setNode] = useState(null);

   // useEffect(() => {
   //    document.addEventListener('mousedown', handleClick, false);

   //    return () => {
   //       document.removeEventListener('mousedown', handleClick, false);
   //    };
   // }, []);

   const handleClick = (event) => {
      if (Node.contains(event.target)) {
         return;
      }
      alert('its work !!');
   };

   const showOptHandler = (event) => {
      setShowOpt((prev) => !prev);
      const cor = event.target.getBoundingClientRect();
      setCorOpt({ x: cor.left + 30, y: cor.top - 30 });
   };

   return (
      <div className="files-viwer">
         {showOpt && (
            <div
               ref={(node) => {
                  setNode(node);
               }}
               className="option"
               style={{ top: corOpt.y + 'px', left: corOpt.x + 'px' }}
            >
               <ul>
                  <li>Preview</li>
                  <li>Remove</li>
                  <li>Details</li>
                  <li>Close</li>
               </ul>
            </div>
         )}
         {!!props.loading && <LoadingSpinner />}
         {props.files.length !== 0 && props.files ? (
            Array.from(props.files).map((file, index) => (
               <ItemFile
                  key={index}
                  path={file.path}
                  showOpt={showOptHandler}
               />
            ))
         ) : (
            <div className="center">
               <p>You don't have any files yet,Please UPLOAD files.</p>
            </div>
         )}
      </div>
   );
};

export default FileViwer;
