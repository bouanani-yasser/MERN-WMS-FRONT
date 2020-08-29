import React from 'react';

import txt from '../../assets/icons/txt.svg';
import audio from '../../assets/icons/audio.svg';
import photo from '../../assets/icons/photo.svg';
import excel from '../../assets/icons/excel.svg';
import pdf from '../../assets/icons/pdf.svg';
import rar from '../../assets/icons/rar.svg';
import video from '../../assets/icons/video.svg';
import word from '../../assets/icons/word.svg';
import unknown from '../../assets/icons/unknown.svg';
import menu from '../../assets/icons/menu.svg';

const ItemFile = (props) => {
   let content = null;
   const name = props.name || props.path.split('/')[2];

   const exts = {
      txt: ['.txt', '.tex', '.wpd', '.rtf', '.xml', '.json'],
      pdf: ['.pdf'],
      word: ['.doc', '.docx'],
      excel: ['.xlsx', '.xltx'],
      photo: ['.jpg', '.git', '.jpeg', '.svg', '.png', '.ico'],
      audio: ['.mp3', '.wav', 'mpa'],
      video: ['.mp4', '.mpg', '.flv', '.3gp', '.avi', '.mov'],
      rar: ['.rar', '.zip', '.7z', '.pkg', '.tar.gz', '.z', '.deb', '.iso'],
   };

   if (exts.photo.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={photo} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else if (exts.audio.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={audio} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else if (exts.video.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={video} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else if (exts.pdf.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={pdf} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else if (exts.word.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={word} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else if (exts.excel.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={excel} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else if (exts.rar.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={rar} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else if (exts.txt.find((el) => name.endsWith(el))) {
      content = (
         <div className="item-file">
            <img src={txt} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   } else {
      content = (
         <div className="item-file">
            <img src={unknown} alt="text" />
            <p title={name}>{name}</p>
            <label onClick={(event) => props.showOpt(event)}>
               <img src={menu} alt="option"></img>
            </label>
         </div>
      );
   }

   return content;
};

export default ItemFile;
