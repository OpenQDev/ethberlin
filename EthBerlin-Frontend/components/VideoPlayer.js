import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Hls from 'hls.js';

// Curtesy from Pinata https://gist.github.com/stevedsimkins/6ac80b5eb9736fb29d9056f4440e71f1 
// Thanks Steve!

const VideoPlayer = () => {
	const [hls, setHls] = useState(null);

	useEffect(() => {
		const script = document.createElement("script");

		script.src = "https://unpkg.com/hls.js/dist/hls.min.js";
		script.async = true;

		document.body.appendChild(script);
	}, []);

	useEffect(() => {
		var hlsFoo = new Hls();
		hlsFoo.loadSource("https://pinnie.mypinata.cloud/ipfs/QmVzQdLztGgzvvYatzCpgubqM3VZPyGa6xbzieAyFNRGcY?stream=true&mode=hls");
		hlsFoo.attachMedia(document.getElementById("cover-video"));
		setHls(hlsFoo);
	}, []);

	return (
		<>
			<video playsInline autoPlay muted loop id="cover-video"></video>
		</>
	);
};

export default VideoPlayer;