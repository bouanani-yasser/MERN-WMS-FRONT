import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import './Banner.css';

const Banner = (props) => (
   <div className="banner">
      <ul>
         <li>Upload Files</li>
         <li>Explore Files</li>
         <li>Find Files</li>
      </ul>
      <Link className="start" className="start" to="/auth">
         Get Started NOW<span></span>
      </Link>
      <button className="inverse">Know More?</button>
   </div>
);

export default Banner;
