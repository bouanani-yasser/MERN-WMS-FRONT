import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import word from '../../assets/icons/word.svg';
import excel from '../../assets/icons/excel.svg';
import pdf from '../../assets/icons/pdf.svg';
import photo from '../../assets/icons/photo.svg';
import rar from '../../assets/icons/rar.svg';
import txt from '../../assets/icons/txt.svg';
import video from '../../assets/icons/video.svg';
import audio from '../../assets/icons/audio.svg';

import './Banner.css';

const Banner = (props) => {
   const icons = useRef();
   const text = useRef();
   const btn = useRef();
   const q = gsap.utils.selector(icons);

   useEffect(() => {
      // Target ALL descendants with the class of .box
      gsap.from(q('.hero-icon'), {
         scale: 0,
         stagger: { each: 0.1, from: 'edges' },
      });
      gsap.from(text.current, { y: 50, scale: 1.3 });
      gsap.from(btn.current, { y: -50, scale: 0 });
   }, [q, btn, text]);

   return (
      <div className="banner">
         <div className="hero-grid-icons" ref={icons}>
            <img className="hero-icon excel" src={excel} alt="excel" />
            <img className="hero-icon txt" src={txt} alt="txt" />
            <img className="hero-icon rar" src={rar} alt="rar" />
            <img className="hero-icon photo" src={photo} alt="photo" />
            <img className="hero-icon word" src={word} alt="word" />
            <img className="hero-icon pdf" src={pdf} alt="pdf" />
            <img className="hero-icon audio" src={audio} alt="audio" />
            <img className="hero-icon video" src={video} alt="video" />
         </div>
         <div className="hero-text" ref={text}>
            <h1 className="hero-title">
               Upload, Manage & Explore Your Files With Clicks
            </h1>
         </div>
         <div className="hero-actions" ref={btn}>
            <Link className="button" to="/auth">
               Get Started
            </Link>
         </div>
      </div>
   );
};

export default Banner;
