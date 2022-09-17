import { useState } from "react";
import axios from "axios";

// Curtesy from Pinata https://gist.github.com/stevedsimkins/6ac80b5eb9736fb29d9056f4440e71f1 
// Thanks Steve!

const UploadFile = () => {

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {

    const formData = new FormData();

    formData.append('file', selectedFile);

    const metadata = JSON.stringify({
      name: 'File name',
      keyvalues: {
        pullRequestId: 'abc123',
      }
    });

    formData.append('pinataMetadata', metadata);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        }
      });
      console.log(res.data);
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