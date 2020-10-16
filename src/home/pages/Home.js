import React, { useState, useContext, useEffect, useCallback } from 'react';

import FileViewer from '../components/FileViewer';
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
import Dashboard from '../../dashboard/pages/Dashboard';

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
   const [showModal, setShowModal] = useState(false);
   const [showDashboard, setShowDashboard] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isUploading, setIsUploading] = useState(false);
   const [error, setError] = useState(null);
   const [formState, inputHandler, setFormData] = useForm(
      {
         file: {
            value: null,
            isValid: false,
         },
         str: {
            value: null,
            isValid: true,
         },
      },
      false
   );

   const fetchData = useCallback(async () => {
      try {
         if (auth.userId && auth.userRole) {
            const result = await axios(
               `${process.env.REACT_APP_BACKEND_URL}docs/list/${auth.userId}`
            );
            setData(result.data.Docs);
            // console.log('docs', result.data.Docs);
            setIsLoading(false);
         }
      } catch (err) {
         console.log('data' + err);
         setIsLoading(false);
         setError(err);
      }
   }, [auth]);
   useEffect(() => {
      setIsLoading(true);
      fetchData();
   }, [fetchData]);

   const onChangeSearchHandler = async (event) => {
      let searchQuery = event.target.value;
      setQuery(searchQuery);
      if (!searchQuery) {
         fetchData();
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
      setShowDashboard(false);
      setFields(fieldsState);
   };

   const uploadHandler = (event) => {
      event.preventDefault();
      setIsUploading(true);
      const formData = new FormData();
      formData.append('doc', formState.inputs.file.value);
      formState.inputs.str &&
         formData.append('str', formState.inputs.str.value);
      formData.append('desc', JSON.stringify(fields));
      setTimeout(() => {
         axios
            .post(`${process.env.REACT_APP_BACKEND_URL}docs/upload`, formData, {
               headers: {
                  Authorization: 'Bearer ' + auth.token,
               },
            })
            .then(function (response) {
               setIsUploading(false);
               cleanModel();
               fetchData();
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
      const formData = new FormData();
      formState.inputs.str &&
         formData.append('str', formState.inputs.str.value);
      formData.append('desc', JSON.stringify(fields));
      setTimeout(() => {
         axios
            .patch(
               `${process.env.REACT_APP_BACKEND_URL}docs/update/${docId}`,
               formData,
               {
                  headers: {
                     Authorization: 'Bearer ' + auth.token,
                  },
               }
            )
            .then(function (response) {
               fetchData();
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
         await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}docs/remove/${docId}`,
            {
               headers: {
                  Authorization: 'Bearer ' + auth.token,
               },
            }
         );
         fetchData();
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
         <Dashboard
            show={showDashboard}
            setShow={setShowDashboard}
            onCancel={cleanModel}
         >
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
                  onClick={() => setShowDashboard(true)}
               >
                  <img src={admin} alt="admin" />
               </button>
            </div>
            <main className="wms-main">
               <FileViewer
                  onInput={inputHandler}
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
                  auth={auth}
               ></FileViewer>
            </main>
         </div>
      </React.Fragment>
   );
};

export default Home;
