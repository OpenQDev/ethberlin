import React, { useState, useRef } from 'react';
// import ToolTipNew from '../../components/Utils/ToolTipNew';

const FileData = ({
  setAlert,
  handleUpload,
  fileName,
  setFileName,
  description,
  setDescription,
  handleSetStep,
  steps,
  uploadType,
  showNameThresh,
  setShowNameThresh,
  nameInputCount,
  setNameInputCount,
  showDescrThresh,
  setShowDescrThresh,
  descrInputCount,
  setDescrInputCount,
  thumbnail,
  setThumbnail,
  cid,
  setCID,
  uploading,
  setUploading,
  submarine,
  setSubmarine,
  upload,
  billing,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const fileInput = useRef(null);
  const threshholdChange = (event) => {
    const count = event.target.value.length;
    if (count > 0) {
      setShowNameThresh(true);
    } else {
      setShowNameThresh(false);
    }
    setFileName(event.target.value);
    setNameInputCount(event.target.value.length);
  };

  const handleUploadStep = () => {
    if (fileName) {
      handleSetStep(2);
      upload();
    } else {
      setAlert('Name is required', 'error');
    }
  };

  const isProPlan = () => {
    return true;
    /* (billing?.activePricingPlan?.type && billing?.activePricingPlan?.type !== planTypes.FREE.type) ||
      // support for old PRO plans
      billing?.activePricingPlan?.name === 'PROFESSIONAL' */
  };

  return (
    <div>
      <h4 className='card-title'>Details</h4>
      <p className='card-title-desc'>Give your file or folder a name.</p>
      <div className='mt-3'>
        <div className='text-muted'>
          Name <span>*</span>
        </div>
        <input
          type='text'
          maxLength='50'
          onChange={threshholdChange}
          name='thresholdconfig'
          id='thresholdconfig'
          value={fileName}
          required
        />
        {showNameThresh ? <span className='badgecount badge badge-success'>{nameInputCount} / 50 </span> : null}
      </div>

      {isProPlan() && (
        <div className='mt-3'>
          <div className='text-muted'>
            Submarine Your File?
            <img
              style={{ height: 25, marginTop: '-8px', marginLeft: 5 }}
              src={'https://gateway.pinata.cloud/ipfs/QmPTsFGpYofLnRd6yyp16tXtKiisNLB8MukaBFYjCQRmaw'}
              alt='Image of a yellow submarine'
            />
            <i id='info-submarine' style={{ marginLeft: 5 }} className='fas fa-info-circle'></i>
          </div>
          {/* <ToolTipNew placement='right' isOpen={tooltipOpen} target='info-submarine' toggle={toggle}>
            Submarining a file is the process of generating an IPFS CID and storing a file without putting the file on
            IPFS. You can upload another copy of the file without Submarining it to put it on the public network, or you
            can leave it private.
          </ToolTipNew> */}
          {/* <ToggleSwitch checked={submarine} toggleChecked={() => setSubmarine(!submarine)} div='Submarine' /> */}
        </div>
      )}
      <button
        disabled={!fileName ? true : false}
        onClick={handleUploadStep}
        style={{ marginTop: 10 }}
        className='btn btn-primary d-block w-100 mt-3'
      >
        Upload
      </button>
    </div>
  );
};

export default FileData;
