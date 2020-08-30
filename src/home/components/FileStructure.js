import React from 'react';

const FileStructure = (props) => {
   const { fields, fieldsChange, setFields } = props;
   return (
      <div className="file-str">
         {fields.map((field, index) => (
            <div className="item-str" key={index}>
               <input
                  className="form-control "
                  type="text"
                  placeholder="key"
                  value={field.key}
                  onChange={(event) => fieldsChange(event, index, 'key')}
               />
               <textarea
                  className="form-control "
                  type="text"
                  style={{ height: '40px' }}
                  placeholder="value"
                  value={field.val}
                  onChange={(event) => fieldsChange(event, index)}
               />
               {index !== 0 ? (
                  <button
                     className="ctr-item btn btn-danger"
                     type="button"
                     onClick={() => {
                        setFields(fields.filter((_, i) => i !== index));
                     }}
                  >
                     x
                  </button>
               ) : (
                  <button
                     className="ctr-item btn btn-success"
                     type="button"
                     onClick={() => {
                        setFields((prev) => prev.concat({ key: '', val: '' }));
                     }}
                  >
                     +
                  </button>
               )}
            </div>
         ))}
      </div>
   );
};

export default FileStructure;
