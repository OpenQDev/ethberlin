import { handleFileValidations } from 'helpers/validations';
import React, { useState, useRef } from 'react';
import { Label, Input, Tooltip } from 'reactstrap';
import { formatBytes } from 'helpers/pretty';
import pinataSub from '../../../assets/images/Submarine-Beta_Standard.svg';
import ToggleSwitch from 'pages/Utility/ToggleSwitch';
import { planTypes } from 'helpers/enums';

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
    return (
      (billing?.activePricingPlan?.type && billing?.activePricingPlan?.type !== planTypes.FREE.type) ||
      // support for old PRO plans
      billing?.activePricingPlan?.name === 'PROFESSIONAL'
    );
  };

  return (
    <div>
      <h4 className='card-title'>Details</h4>
      <p className='card-title-desc'>Give your file or folder a name.</p>
      <div className='mt-3'>
        <Label className='text-muted'>
          Name <span>*</span>
        </Label>
        <Input
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
          <Label className='text-muted'>
            Submarine Your File?
            <img
              style={{ height: 25, marginTop: '-8px', marginLeft: 5 }}
              src={pinataSub}
              alt='Image of a yellow submarine'
            />
            <i id='info-submarine' style={{ marginLeft: 5 }} className='fas fa-info-circle'></i>
          </Label>
          <Tooltip placement='right' isOpen={tooltipOpen} target='info-submarine' toggle={toggle}>
            Submarining a file is the process of generating an IPFS CID and storing a file without putting the file on
            IPFS. You can upload another copy of the file without Submarining it to put it on the public network, or you
            can leave it private.
          </Tooltip>
          <ToggleSwitch checked={submarine} toggleChecked={() => setSubmarine(!submarine)} label='Submarine' />
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
