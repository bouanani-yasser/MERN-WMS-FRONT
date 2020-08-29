import React from 'react';
import ReactDOM from 'react-dom';

import { Logger } from 'logging-library';
import FileViewer from 'react-file-viewer';
import mp4 from '../../assets/img/doc.jpg';

const file = mp4;

const type = 'jpg';

const FileReader = () => {
   const onError = (e) => {
      Logger.logError(e, 'error in file-viewer');
   };

   return ReactDOM.createPortal(
      <FileViewer fileType={type} filePath={file} onError={onError} />,
      document.getElementById('file-reader-hook')
   );
};

export default FileReader;
