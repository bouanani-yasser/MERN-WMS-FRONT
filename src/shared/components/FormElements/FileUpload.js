import React, { useRef, useState, useEffect, useContext } from 'react';

import Button from './Button';
import FileStructure from '../../../home/components/FileStructure';
import './FileUpload.css';
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
            <main>
               <Button type="button" onClick={pickFileHandler}>
                  PICK FILE
               </Button>
               {!previewUrl ? (
                  <p>Please pick a file .</p>
               ) : (
                  <p style={{ fontWeight: 'bold' }}>{file.name}</p>
               )}
               <div className="description">
                  <h3>Description</h3>
                  <FileStructure />
               </div>
            </main>
            <Button type="submit" disabled={!props.isValid}>
               UPLOAD
            </Button>
         </form>
      </div>
   );
};

export default FileUpload;
