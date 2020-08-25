import React, { useState, useContext } from 'react';

import FileViwer from '../components/FileViwer';
import Search from '../components/Search';
import { useForm } from '../../shared/hooks/form-hook';
import FileUpload from '../../shared/components/FormElements/FileUpload';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';

const Home = (props) => {
   const auth = useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
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

   const clickHandler = () => {
      setShowModal(false);
   };

   const uploadHandler = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', formState.inputs.file.value);

      axios
         .post('http://localhost:5000/api/users/upload', formData, {
            headers: {
               Authorization: 'Bearer ' + auth.token,
            },
         })
         .then(function (response) {
            // handle success
            console.log(response);
         })
         .catch(function (error) {
            // handle error
            console.log(error);
         });
   };

   return (
      <React.Fragment>
         <Modal show={showModal} onCancel={clickHandler}>
            <FileUpload
               id="file"
               uploadHandler={uploadHandler}
               onInput={inputHandler}
               isValid={formState.isValid}
            />
         </Modal>
         <div className="home">
            <div className="wms-head">
               <Search></Search>
               <button
                  onClick={() => {
                     setShowModal(true);
                  }}
               >
                  Add Files
               </button>
            </div>
            <main className="wms-main">
               <FileViwer></FileViwer>
            </main>
         </div>
      </React.Fragment>
   );
};

export default Home;
