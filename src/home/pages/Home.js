import React, { useState, useContext, useEffect } from 'react';

import FileViwer from '../components/FileViwer';
import Search from '../components/Search';
import { useForm } from '../../shared/hooks/form-hook';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import up from '../../assets/svg/up-arrow.svg';
import axios from 'axios';

const Home = () => {
   const fieldsState = [
      { key: 'Title', val: '' },
      { key: 'Type', val: '' },
      { key: 'Content', val: '' },
   ];
   const auth = useContext(AuthContext);
   const [fields, setFields] = useState(fieldsState);
   const [data, setData] = useState({});
   const [query, setQuery] = useState();
   const [reload, setReload] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isUploading, setIsUploading] = useState(false);
   const [error, setError] = useState(false);
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
                  `${process.env.REACT_APP_BACKEND_URL}docs/list/${auth.userId}`
               );
               setData(result.data.Docs);
               console.log('docs', result.data.Docs);
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
      let searchQuery = event.target.value;
      setQuery(searchQuery);
      if (!searchQuery) {
         setReload((prev) => !prev);
         return;
      }
      try {
         const result = await axios(
            `${process.env.REACT_APP_BACKEND_URL}docs/search/${auth.userId}/${searchQuery}`
         );
         setData(result.data.Docs);
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
      formData.append('str', JSON.stringify(fields));
      setTimeout(() => {
         axios
            .post(`${process.env.REACT_APP_BACKEND_URL}docs/upload`, formData, {
               headers: {
                  Authorization: 'Bearer ' + auth.token,
               },
            })
            .then(function (response) {
               // handle success
               console.log(response);
               setIsUploading(false);
               cleanModel();
               setReload((prev) => !prev);
            })
            .catch(function (error) {
               // handle error
               setIsUploading(false);
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

   const removeItemHandler = async (docId) => {
      setIsLoading(true);
      try {
         const result = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}docs/remove/${docId}`,
            {
               headers: {
                  Authorization: 'Bearer ' + auth.token,
               },
            }
         );
         console.log('res ', result);
         setReload((prev) => !prev);
         setIsLoading(false);
      } catch (err) {
         console.log('data' + err);
         setIsLoading(false);
         setError(true);
      }
   };

   const downloadItemHandler = async (docId) => {
      try {
         const result = await axios(
            `${process.env.REACT_APP_BACKEND_URL}docs/download/${docId}`
         );
         console.log('d', result.config.url);
         window.open(result.config.url);
      } catch (err) {
         console.log('err' + err);
         setError(true);
      }
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
               <FileViwer
                  removeItemHandler={removeItemHandler}
                  downloadItemHandler={downloadItemHandler}
                  files={data}
                  search={query}
                  loading={isLoading}
               ></FileViwer>
            </main>
         </div>
      </React.Fragment>
   );
};

export default Home;
