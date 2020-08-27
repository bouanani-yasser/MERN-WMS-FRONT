import React, { useState, useContext, useEffect } from 'react';

import FileViwer from '../components/FileViwer';
import Search from '../components/Search';
import { useForm } from '../../shared/hooks/form-hook';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';

const Home = () => {
   const auth = useContext(AuthContext);
   const [data, setData] = useState([{}]);
   const [showModal, setShowModal] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [formState, inputHandler] = useForm(
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
         try {
            const result = await axios(
               `http://localhost:5000/api/${auth.userId}/files`
            );
            setData(result.data);
         } catch (err) {
            console.log('data' + err);
         }
      };

      fetchData();
   }, [data]);

   const fieldsState = [
      { key: 'Title', val: '' },
      { key: 'Type', val: '' },
      { key: 'Content', val: '' },
   ];
   const [fields, setFields] = useState(fieldsState);

   const onChangeHandler = (event, index, type) => {
      const newFields = [...fields];
      type === 'key'
         ? (newFields[index].key = event.target.value)
         : (newFields[index].val = event.target.value);
      setFields([...newFields]);
   };

   const clickHandler = () => {
      setShowModal(false);
      setFields(fieldsState);
   };

   const uploadHandler = (event) => {
      event.preventDefault();
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', formState.inputs.file.value);
      setTimeout(() => {
         axios
            .post('http://localhost:5000/api/users/uplad', formData, {
               headers: {
                  Authorization: 'Bearer ' + auth.token,
               },
            })
            .then(function (response) {
               // handle success
               console.log(response);
               setIsLoading(false);
               clickHandler();
            })
            .catch(function (error) {
               // handle error
               setIsLoading(false);
               console.log(error);
            });
      }, 1000);
   };

   return (
      <React.Fragment>
         <Modal show={showModal} onCancel={clickHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
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
               <Search></Search>
               <button
                  className="btn btn-info"
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
