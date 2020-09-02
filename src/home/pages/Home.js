import React, { useState, useContext, useEffect } from 'react';

import FileViwer from '../components/FileViwer';
import Search from '../components/Search';
import { useForm } from '../../shared/hooks/form-hook';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import up from '../../assets/svg/plus.svg';
import axios from 'axios';

const Home = () => {
   const fieldsState = [
      { key: 'Title', val: '' },
      { key: 'Type', val: '' },
      { key: 'Content', val: '' },
   ];
   const auth = useContext(AuthContext);
   const [data, setData] = useState({});
   const [reload, setReload] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isUploading, setIsUploading] = useState(false);
   const [error, setError] = useState(false);
   const [fields, setFields] = useState(fieldsState);
   const [formState, inputHandler, setFormData] = useForm(
      {
         file: {
            value: null,
            isValid: false,
         },
      },
      false
   );

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         setTimeout(async () => {
            try {
               const result = await axios(
                  `${process.env.REACT_APP_BACKEND_URL}users/${auth.userId}/files`
               );
               setData(result.data.files);
               console.log('files', result.data.files);
               setIsLoading(false);
            } catch (err) {
               console.log('data' + err);
               setError(true);
            }
         }, 0);
      };

      fetchData();
   }, [reload, auth.userId]);

   const onChangeSearchHandler = async (event) => {
      // setIsLoading(true);
      let query = event.target.value;
      try {
         const result = await axios(
            `${process.env.REACT_APP_BACKEND_URL}users/${auth.userId}/files/${query}`
         );
         setData(result.data.files);
      } catch (err) {
         console.log('err ' + err);
         setError(true);
      }
      // setIsLoading(false);
   };

   const onChangeHandler = (event, index, type) => {
      const newFields = [...fields];
      type === 'key'
         ? (newFields[index].key = event.target.value)
         : (newFields[index].val = event.target.value);
      setFields([...newFields]);
   };

   const clearError = () => {
      setError(false);
   };
   const cleanModel = () => {
      setShowModal(false);
      setFields(fieldsState);
   };

   const uploadHandler = (event) => {
      event.preventDefault();
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', formState.inputs.file.value);
      setTimeout(() => {
         axios
            .post(
               `${process.env.REACT_APP_BACKEND_URL}users/upload`,
               formData,
               {
                  headers: {
                     Authorization: 'Bearer ' + auth.token,
                  },
               }
            )
            .then(function (response) {
               // handle success
               console.log(response);
               setIsUploading(false);
               cleanModel();
               setReload((prev) => !prev);
            })
            .catch(function (error) {
               // handle error
               setIsLoading(false);
               cleanModel();
               setError(true);
               console.log(error);
            });
      }, 0);

      setFormData(
         {
            file: {
               value: null,
               isValid: false,
            },
         },
         false
      );
   };

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         <Modal show={showModal} onCancel={cleanModel}>
            {isUploading && <LoadingSpinner asOverlay />}
            <FileUpload
               id="file"
               uploadHandler={uploadHandler}
               onInput={inputHandler}
               fields={fields}
               fieldsChange={onChangeHandler}
               isValid={formState.isValid}
               setFields={setFields}
            />
         </Modal>
         <div className="home">
            <div className="wms-head">
               <button
                  onClick={() => {
                     setShowModal(true);
                  }}
               >
                  <span>
                     <img src={up} alt="up" />
                  </span>
                  NEW
               </button>
               <Search onChange={onChangeSearchHandler}></Search>
            </div>
            <main className="wms-main">
               <FileViwer files={data} loading={isLoading}></FileViwer>
            </main>
         </div>
      </React.Fragment>
   );
};

export default Home;
