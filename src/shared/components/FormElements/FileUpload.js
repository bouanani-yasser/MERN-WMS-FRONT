import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
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

   const pickImageHandler = () => {
      filePickerRef.current.click();
   };

   return (
      <div className="form-control">
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
            <div>
               {previewUrl && <p>{file.name}</p>}
               {!previewUrl && <p>Pick a File.</p>}

               <Button type="button" onClick={pickImageHandler}>
                  PICK IMAGE
               </Button>
            </div>
            <Button center type="submit" disabled={!isValid}>
               Upload
            </Button>
         </form>
      </div>
   );
};

export default FileUpload;
