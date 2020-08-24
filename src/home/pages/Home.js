import React from 'react';

import FileViwer from '../components/FileViwer';
import Search from '../components/Search';
import { useForm } from '../../shared/hooks/form-hook';
import FileUpload from '../../shared/components/FormElements/FileUpload';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Home = (props) => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const [formState, inputHandler] = useForm(
      {
         file: {
            value: null,
            isValid: false,
         },
      },
      false
   );

   const uploadHandler = async (event) => {
      event.preventDefault();
      try {
         const formData = new FormData();
         formData.append('file', formState.inputs.file.value);
         const responseData = await sendRequest(
            'http://localhost:5000/api/users/upload',
            'POST',
            formData
         );
         console.log(responseData);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="home">
         <Search></Search>
         <FileUpload
            center
            id="file"
            onInput={inputHandler}
            errorText="Please provide a file."
            uploadHandler={uploadHandler}
         />
      </div>
   );
};

export default Home;
