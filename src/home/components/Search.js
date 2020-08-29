import React from 'react';

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

export default Search;
