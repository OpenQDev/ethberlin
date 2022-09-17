import React, { useState, useCallback } from 'react';
import StepProgress from './StepProgress';
import UploadWizard from './UploadWizard';

import { setAlert } from '../../../store/alert/alert.actions';
import { handleUpload } from './pin.actions';
import { connect } from 'react-redux';
import { formatBytes } from '../../../helpers/pretty';
import { planTypes } from 'helpers/enums';

const index = ({ uploadType, setAlert, closeModal, handleUpload, billing, metrics }) => {
  const [steps, setSteps] = useState([
    {
      key: 1,
      step: 'Select',
      active: true,
    },
    {
      key: 2,
      step: 'Detail',
      active: false,
    },
    {
      key: 3,
      step: 'Upload',
      active: false,
    },
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [showNameThresh, setShowNameThresh] = useState(false);
  const [nameInputCount, setNameInputCount] = useState(0);
  const [showDescrThresh, setShowDescrThresh] = useState(false);
  const [descrInputCount, setDescrInputCount] = useState(0);
  const [thumbnail, setThumbnail] = useState([]);
  const [cid, setCID] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submarine, setSubmarine] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wrapWithDirectory] = useState(false);

  const handleSetStep = (stepIndex) => {
    const updatedSteps = JSON.parse(JSON.stringify(steps));
    updatedSteps.forEach((s) => {
      s.active = false;
    });
    updatedSteps[stepIndex].active = true;
    setSteps(updatedSteps);
  };

  const handleFileInput = useCallback(
    (e) => {
      const files = e.target.files || [];
      if (uploadType === 'file' && files.length > 1) {
        setAlert('You selected more than one file', 'error');
        setSelectedFiles([]);
        return;
      }
      const fileValidation = handleFileValidations(files, metrics, billing);
      if (fileValidation.isValid) {
        for (let i = 0; i < files.length; i++) {
          Object.assign(files[i], {
            preview: URL.createObjectURL(files[i]),
            formattedSize: formatBytes(files[i].size),
          });
        }
        if (uploadType === 'file') {
          setSelectedFiles(files);
          setFileName(files[0].name);
        } else {
          setSelectedFiles(files);
        }
        const updatedSteps = JSON.parse(JSON.stringify(steps));
        updatedSteps.forEach((s) => {
          s.active = false;
        });
        updatedSteps[1].active = true;
        setSteps(updatedSteps);
      } else {
        setAlert(fileValidation.errorMsg, 'error');
        closeModal();
        return;
      }
    },
    [metrics]
  );

  const upload = async () => {
    setUploading(true);
    await handleUpload(selectedFiles, fileName, wrapWithDirectory, handleUploadProgress, submarine);
    setUploading(false);
    closeModal();
  };

  const handleUploadProgress = (uploadEvt) => {
    const percentUploaded = (uploadEvt.loaded / uploadEvt.total) * 100;
    setProgress(Number(percentUploaded.toFixed(2)));
  };

  return (
    <div>
      <StepProgress selectedFiles={selectedFiles} steps={steps} handleSetStep={handleSetStep} />
      {(billing?.activePricingPlan?.storage_limit_gb ||
        billing?.activePricingPlan?.isLegacy ||
        // allow file upload for plans that have limit or for custom plans
        billing?.activePricingPlan?.type === planTypes.ENTERPRISE.type) && (
        <UploadWizard
          handleUpload={handleUpload}
          setAlert={setAlert}
          selectedFiles={selectedFiles}
          handleFileInput={handleFileInput}
          steps={steps}
          handleSetStep={handleSetStep}
          uploadType={uploadType}
          fileName={fileName}
          setFileName={setFileName}
          description={description}
          setDescription={setDescription}
          showNameThresh={showNameThresh}
          setShowNameThresh={setShowNameThresh}
          nameInputCount={nameInputCount}
          setNameInputCount={setNameInputCount}
          showDescrThresh={showDescrThresh}
          setShowDescrThresh={setShowDescrThresh}
          descrInputCount={descrInputCount}
          setDescrInputCount={setDescrInputCount}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          cid={cid}
          setCID={setCID}
          uploading={uploading}
          setUploading={setUploading}
          submarine={submarine}
          setSubmarine={setSubmarine}
          upload={upload}
          progress={progress}
          billing={billing}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    billing: state.billing,
    metrics: state.metrics?.metrics,
  };
};

export default connect(mapStateToProps, { setAlert, handleUpload })(index);
