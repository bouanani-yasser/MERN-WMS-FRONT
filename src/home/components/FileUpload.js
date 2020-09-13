import React, { useRef, useState, useEffect } from 'react';

import Button from '../../shared/components/FormElements/Button';
import FileStructure from './FileStructure';
import ItemFile from './ItemFile';
import close from '../../assets/svg/close.svg';

const FileUpload = (props) => {
   const [file, setFile] = useState();
   const [previewUrl, setPreviewUrl] = useState();
   const [isValid, setIsValid] = useState(false);

   const filePickerRef = useRef();

   useEffect(() => {
      if (!file) {
         return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
         setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
   }, [file]);

   const pickedHandler = (event) => {
      let pickedFile;
      let fileIsValid = isValid;
      if (event.target.files && event.target.files.length === 1) {
         pickedFile = event.target.files[0];
         setFile(pickedFile);
         setIsValid(true);
         fileIsValid = true;
      } else {
         setIsValid(false);
         fileIsValid = false;
      }
      props.onInput(props.id, pickedFile, fileIsValid);
   };

   const pickFileHandler = async () => {
      filePickerRef.current.click();
   };

   return (
      <div className="upload-modal">
         <div className="btn-close" onClick={props.onCancel}>
            <img src={close} alt="close" />
         </div>
         <form
            className="form-upload"
            encType="multipart/form-data"
            onSubmit={props.uploadHandler}
         >
            <input
               id={props.id}
               name="file"
               ref={filePickerRef}
               style={{ display: 'none' }}
               type="file"
               // accept=".jpg,.png,.jpeg"
               onChange={pickedHandler}
            />

            <Button type="button" onClick={pickFileHandler}>
               PICK FILE
            </Button>
            {!previewUrl ? (
               <p style={{ margin: '20px' }}>Please pick a file</p>
            ) : (
               <div className="center">
                  <ItemFile name={file.name} />
               </div>
            )}

            <FileStructure
               fields={props.fields}
               fieldsChange={props.fieldsChange}
               setFields={props.setFields}
            />

            <Button type="submit" disabled={!props.isValid}>
               UPLOAD
            </Button>
         </form>
      </div>
   );
};

export default FileUpload;
