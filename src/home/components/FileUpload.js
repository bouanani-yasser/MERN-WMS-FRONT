import React, { useRef, useState, useEffect } from 'react';

import Button from '../../shared/components/FormElements/Button';
import FileStructure from './FileStructure';
import ItemFile from './ItemFile';

<<<<<<< HEAD:src/home/components/FileUpload.js
=======
import Button from '../../shared/components/FormElements/Button';
import FileStructure from './FileStructure';

>>>>>>> f538a78f5afe9c0bf6333eed4aba76cff5f713f8:src/shared/components/FormElements/FileUpload.js
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

            <Button type="button" onClick={pickFileHandler}>
               PICK FILE
            </Button>
            {!previewUrl ? (
               <p>Please pick a file .</p>
            ) : (
<<<<<<< HEAD:src/home/components/FileUpload.js
               <div className="center">
                  <ItemFile name={file.name} />
               </div>
=======
               <p style={{ fontWeight: 'bold' }}>{file.name}</p>
>>>>>>> f538a78f5afe9c0bf6333eed4aba76cff5f713f8:src/shared/components/FormElements/FileUpload.js
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
