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
import admin from '../../assets/svg/admin.svg';
import axios from 'axios';
import Dashboard from '../components/Dashboard';

const Home = () => {
   const fieldsState = [
      { key: 'Title', val: '' },
      { key: 'Type', val: '' },
      { key: 'Content', val: '' },
   ];
   const auth = useContext(AuthContext);
   const [fields, setFields] = useState(fieldsState);
   const [data, setData] = useState([]);
   const [query, setQuery] = useState();
   const [reload, setReload] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [showlistUsers, setShowListUsers] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isUploading, setIsUploading] = useState(false);
   const [error, setError] = useState(null);
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
               setIsLoading(false);
               setError(err);
            }
         }, 1000);
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
         setError(err);
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
      setError(null);
   };
   const cleanModel = () => {
      setShowModal(false);
      setShowListUsers(false);
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
               console.log(response);
               setIsUploading(false);
               cleanModel();
               setReload((prev) => !prev);
            })
            .catch(function (error) {
               setIsUploading(false);
               cleanModel();
               setError(error);
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

   const updateHandler = (docId) => {
      setTimeout(() => {
         axios
            .patch(
               `${process.env.REACT_APP_BACKEND_URL}docs/update/${docId}`,
               { str: JSON.stringify(fields) },
               {
                  headers: {
                     Authorization: 'Bearer ' + auth.token,
                  },
               }
            )
            .then(function (response) {
               console.log('update', response);
               setReload((prev) => !prev);
            })
            .catch(function (error) {
               setError(error);
               console.log('update', error);
            });
      }, 0);
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
         setError(err);
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
         setError(err);
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
               isValid={formState.isValid}
               fieldsChange={onChangeHandler}
               setFields={setFields}
               onCancel={cleanModel}
            />
         </Modal>
         <Dashboard show={showlistUsers} onCancel={cleanModel}>
            {isLoading && <LoadingSpinner asOverlay />}
         </Dashboard>
         <div className="home">
            <div className="wms-head">
               <button
                  className="up"
                  onClick={() => {
                     setShowModal(true);
                     setFields(fieldsState);
                  }}
               >
                  <img src={up} alt="up" />
                  <label>New</label>
               </button>
               <Search onChange={onChangeSearchHandler}></Search>
               <button
                  className="setting"
                  onClick={() => setShowListUsers(true)}
               >
                  <img src={admin} alt="admin" />
               </button>
            </div>
            <main className="wms-main">
               <FileViwer
                  removeItemHandler={removeItemHandler}
                  downloadItemHandler={downloadItemHandler}
                  updateHandler={updateHandler}
                  files={data}
                  search={query}
                  loading={isLoading}
                  fieldsChange={onChangeHandler}
                  fields={fields}
                  setFields={setFields}
                  fieldsState={fieldsState}
               ></FileViwer>
            </main>
         </div>
      </React.Fragment>
   );
};

export default Home;
