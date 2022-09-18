import Head from "next/head";
import UploadFile from "../../components/UploadFile/UploadFile";
import VideoPlayer from "../../components/VideoPlayer";
import PR from "../../components/PR";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import StoreContext from "../../store/Store/StoreContext";

export default function Upload() {
  const router = useRouter();
  const { pullRequestId } = router.query;
  const [lensHandle, setLensHandle] = useState(null);
  const [appState, dispatch] = useContext(StoreContext);
  const [cid, setCid] = useState(null);

  useEffect(() => {
    const handle= window.localStorage.getItem('lensHandle');
    if(handle) {
      setLensHandle(handle);
    } else {
      setLensHandle("Anon");
    }
  })

  useEffect(() => {
    async function check() {
      try {
        console.log("pullRequestId", pullRequestId)
        const res = await appState.pinataService.fetchVideo(pullRequestId);
        console.log("res: ", res);
        setCid(res);
      } catch (error) {
        console.log(error);
      }
    }

    if (pullRequestId) {
      check();
    }
  }, [pullRequestId]);

  return (
    <div className="bg-nav-bg min-h-[680px]">
      <Head>
        <title>EthBerlin 2022</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full items-center">
          {cid ? (
            <>
              <div className="flex bg-black w-full justify-center">
                <VideoPlayer cid={cid} />{" "}
              </div>
              <div className="flex w-[960px]">
                <PR pullRequestId={pullRequestId} />
              </div>
            </>
          ) : (
            <div className="flex justify-center py-24 w-full bg-dark-mode h-[700px]">
              <UploadFile pullRequestId={pullRequestId} lensHandle={lensHandle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}