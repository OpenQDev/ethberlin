import React from 'react';

const Uploading = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {props.progress > 0 && props.progress < 100 ? (
        <>
          {/* <LinearProgress variant='determinate' value={props.progress} color='primary' /> */}
          <p className='upload-progress-label'>Progress: {props.progress}%</p>
        </>
      ) : (
        <>
          {/* <CircularProgress color='primary' /> */}
          <p>Generating CIDs and pinning your file(s). This may take a while…</p>
        </>
      )}

      <div>
        <p>Depending on the size of your upload, this process may take some time.</p>
        <p>Please do not close your browser or close this modal.</p>
      </div>
    </div>
  );
};

export default Uploading;
