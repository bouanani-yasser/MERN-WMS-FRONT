import React, { useState } from 'react';

const FileStructure = () => {
   const { fields, setFields } = useState(5);
   return (
      <div className="file-str">
         <button
            onClick={() => {
               setFields((prev) => prev + 1);
            }}
         >
            add
         </button>
      </div>
   );
};

export default FileStructure;
