import { useState, useContext, useEffect } from "react";
import StoreContext from "../../store/Store/StoreContext";

const UploadFile = ({ pullRequestId, lensHandle }) => {
  console.log('pullRequestId', pullRequestId);

  const [selectedFile, setSelectedFile] = useState();
  const [appState, dispatch] = useContext(StoreContext);

  useEffect(() => {
    async function check() {
      try {
        const res = await appState.pinataService.fetchVideo(pullRequestId);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    if (pullRequestId) {
      check();
    }
  }, [pullRequestId]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleSubmission = async () => {

    const formData = new FormData();

    formData.append('file', selectedFile);
    console.log('lensHandle', lensHandle);
    const metadata = JSON.stringify({
      name: 'File name',
      keyvalues: {
        pullRequestId,
        lensHandle
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

  const foo = () => {
    if (lensHandle) {
      handleSubmission();
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center bg-nav-bg border rounded-sm border-gray-700 w-1/2 h-1/2">
      <label className="form-label text-lg">Choose File</label>
      <input className="input-field btn-default flex p-2 border" type="file" onChange={changeHandler} />
      <button className="btn-primary px-12 py-1" onClick={handleSubmission}>Submit</button>
    </div>
  );
};

export default UploadFile;