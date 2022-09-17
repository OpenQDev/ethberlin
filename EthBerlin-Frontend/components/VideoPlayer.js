import { useState, useContext, useEffect } from "react";
import Hls from 'hls.js';

// Curtesy from Pinata https://gist.github.com/stevedsimkins/6ac80b5eb9736fb29d9056f4440e71f1 
// Thanks Steve!

const VideoPlayer = ({ cid }) => {

	useEffect(() => {
		const script = document.createElement("script");

		script.src = "https://unpkg.com/hls.js/dist/hls.min.js";
		script.async = true;

		document.body.appendChild(script);
	}, []);

	useEffect(() => {
		console.log('cid', cid);
		if (cid) {
			var hlsFoo = new Hls();
			hlsFoo.loadSource(`https://openqethberlin.mypinata.cloud/ipfs/${cid}?stream=true&mode=hls`);
			hlsFoo.attachMedia(document.getElementById("cover-video"));
		}
	}, [cid]);

	return (
		<>
			<video playsInline autoPlay controls loop width="960" height="720" id="cover-video"></video>
		</>
	);
};

export default VideoPlayer;