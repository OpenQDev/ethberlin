import { useState, useContext, useEffect } from "react";
import Hls from 'hls.js';

const VideoMini = ({ cid }) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://unpkg.com/hls.js/dist/hls.min.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (cid) {
      var hlsFoo = new Hls();
      hlsFoo.loadSource(`https://openqethberlin.mypinata.cloud/ipfs/${cid}?stream=true&mode=hls`);
      hlsFoo.attachMedia(document.getElementById(`cover-video-${cid}`));
    }
  }, [cid]);

  return (
    <video playsInline muted width="320" height="240" id={`cover-video-${cid}`}></video>
  );
};

export default VideoMini;
