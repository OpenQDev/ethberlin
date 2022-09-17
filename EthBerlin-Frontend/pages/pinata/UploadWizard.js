import React from 'react';
import FileData from './FileData';
import UploadForm from './UploadForm';
import Uploading from './Uploading';

const UploadWizard = ({
  steps,
  setAlert,
  handleUpload,
  handleFileInput,
  uploadType,
  selectedFiles,
  fileName,
  setFileName,
  description,
  setDescription,
  handleSetStep,
  upload,
  progress,
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
  billing,
}) => {
  const activeStep = steps.filter((s) => s.active)[0];
  switch (activeStep.key) {
    case 1:
      return (
        <div>
          <UploadForm selectedFiles={selectedFiles} uploadType={uploadType} handleFileInput={handleFileInput} />
        </div>
      );
    case 2:
      return (
        <div>
          <FileData
            handleUpload={handleUpload}
            setAlert={setAlert}
            fileName={fileName}
            setFileName={setFileName}
            description={description}
            setDescription={setDescription}
            handleSetStep={handleSetStep}
            steps={steps}
            uploadType={uploadType}
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
            billing={billing}
          />
        </div>
      );
    case 3:
      return <Uploading progress={progress} />;
    default:
      return (
        <div>
          <UploadForm selectedFiles={selectedFiles} uploadType={uploadType} handleFileInput={handleFileInput} />
        </div>
      );
  }
};

export default UploadWizard;
