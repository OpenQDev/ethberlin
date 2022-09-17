import { useState, useContext } from "react";
import axios from "axios";
import StoreContext from "../../store/Store/StoreContext";

// Curtesy from Pinata https://gist.github.com/stevedsimkins/6ac80b5eb9736fb29d9056f4440e71f1 
// Thanks Steve!

const UploadFile = ({ pullRequestId }) => {
  console.log('pullRequestId', pullRequestId);

  const [selectedFile, setSelectedFile] = useState();
  const [appState, dispatch] = useContext(StoreContext);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {

    const formData = new FormData();

    formData.append('file', selectedFile);

    const metadata = JSON.stringify({
      name: 'File name',
      keyvalues: {
        pullRequestId,
      }
    });

    formData.append('pinataMetadata', metadata);

    try {
      const IpfsHash = await appState.pinataService.uploadVideo(formData);
      console.log(IpfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label">Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
};

export default UploadFile;