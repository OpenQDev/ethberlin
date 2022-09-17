import React, { useRef, useEffect } from 'react';

const UploadForm = ({ uploadType, handleFileInput, selectedFiles }) => {
  const fileInput = useRef(null);

  if (uploadType === 'file') {
    return (
      <div className='pinata-file-uploader'>
        <i style={{ fontSize: 36, marginBottom: 15 }} className='fas fa-file-upload'></i>
        <h3>Select a file to upload</h3>
        <input ref={fileInput} style={{ display: 'none' }} type='file' onChange={handleFileInput} />
        <div>
          <button onClick={() => fileInput.current && fileInput.current.click()} className='btn btn-pinataSecondary'>
            {selectedFiles.length > 0 ? 'Select another file' : 'Select a file'}
          </button>
          <p style={{ marginTop: 10, textDecoration: 'underline' }}>
            {selectedFiles.length > 0 && selectedFiles[0].name}
          </p>
        </div>
      </div>
    );
  } else {
    useEffect(() => {
      if (fileInput.current !== null) {
        fileInput.current.setAttribute('directory', '');
        fileInput.current.setAttribute('webkitdirectory', '');
      }
    }, [fileInput]);

    return (
      <div className='pinata-file-uploader'>
        <i style={{ fontSize: 36, marginBottom: 15 }} className='fas fa-folder-plus'></i>
        <h3>Select a folder to upload</h3>
        <input style={{ display: 'none' }} ref={fileInput} type='file' onChange={handleFileInput} />
        <button onClick={(e) => fileInput.current && fileInput.current.click()} className='btn btn-pinataSecondary'>
          Select
        </button>
      </div>
    );
  }
};

export default UploadForm;
