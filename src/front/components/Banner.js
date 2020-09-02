import React from 'react';
import { Link } from 'react-router-dom';
import yes from '../../assets/svg/yes.svg';
import doc from '../../assets/svg/doc.svg';
import up from '../../assets/svg/upload.svg';

import './Banner.css';

const Banner = (props) => (
   <div className="banner">
      <ul>
         <li>
            <span>
               <img src={up} alt="yes" />
            </span>
            upload files & describe their content
         </li>
         <li>
            <span>
               <img src={doc} alt="yes" />
            </span>
            Explore & manage files
         </li>
         <li>
            <span>
               <img src={yes} alt="yes" />
            </span>
            Quick find files
         </li>
      </ul>
      <div className="btns">
         <Link className="btn btn-warning start" to="/auth">
            Get Started NOW<span></span>
         </Link>
         <button className="inverse">Know More?</button>
      </div>
   </div>
);

export default Banner;
