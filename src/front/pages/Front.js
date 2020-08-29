import React from 'react';

import docImg from '../../assets/svg/hero.svg';
import Banner from '../components/Banner';
const Front = () => {
   return (
      <section className="home">
         <Banner />
         <div className="doc-img">
            <img src={docImg} alt="doc" />
         </div>
         {/* <FileReader /> */}
      </section>
   );
};

export default Front;
