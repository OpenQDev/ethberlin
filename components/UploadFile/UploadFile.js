import { useState, useContext, useEffect } from "react";
import StoreContext from "../../store/Store/StoreContext";

// Curtesy from Pinata https://gist.github.com/stevedsimkins/6ac80b5eb9736fb29d9056f4440e71f1
// Thanks Steve!

const UploadFile = ({ pullRequestId, lensHandle }) => {
  console.log("pullRequestId", pullRequestId);
  console.log("lensHandle", lensHandle);

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

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: "File name",
      keyvalues: {
        pullRequestId,
        lensHandle,
      },
    });

    formData.append("pinataMetadata", metadata);

    try {
      const IpfsHash = await appState.pinataService.uploadVideo(formData);
      console.log("ipfs hash here: ", IpfsHash);

      if (window.localStorage.getItem("videos")) {
        let videos = JSON.parse(window.localStorage.getItem("videos"));
        console.log("video upload array", videos);
        videos.push([IpfsHash, pullRequestId]);
        window.localStorage.setItem("videos", JSON.stringify(videos));
      } else {
        const arr = [[IpfsHash, pullRequestId]];
        window.localStorage.setItem("videos", JSON.stringify(arr));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center bg-nav-bg border border-gray-700 w-1/2 h-1/2">
      <label className="form-label text-lg">Choose File</label>
      <input className="input-field btn-default flex p-2 border" type="file" onChange={changeHandler} />
      <button className="btn-primary px-12 py-1" onClick={handleSubmission}>Submit</button>
    </div>
  );
};

export default UploadFile;
