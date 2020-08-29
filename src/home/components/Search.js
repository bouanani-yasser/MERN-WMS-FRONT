import React from 'react';

<<<<<<< HEAD
const Search = (props) => {
   return (
      <div className=" search">
         <input
            type="text"
            id="search"
            className="search"
            placeholder="Search"
            onChange={props.onChange}
         />
      </div>
   );
};
=======
import Input from '../../shared/components/FormElements/Input';

const Search = (props) => (
   <div className=" search">
      <input type="text" id="search" className="search" placeholder="Search" />
   </div>
);
>>>>>>> f538a78f5afe9c0bf6333eed4aba76cff5f713f8

export default Search;
