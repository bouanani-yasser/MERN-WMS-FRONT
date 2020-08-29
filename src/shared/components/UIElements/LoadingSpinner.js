import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
   return (
      <div className={` ${props.asOverlay && 'loading-spinner__overlay'}`}>
         <div className="loader"></div>
      </div>
   );
};

export default LoadingSpinner;
