import Head from "next/head";
import Image from "next/image";
import UploadFile from "../../components/UploadFile/UploadFile";
import VideoPlayer from "../../components/VideoPlayer";
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import StoreContext from "../../store/Store/StoreContext";

export default function Upload() {
	const router = useRouter();
	const { pullRequestId } = router.query;

	const [appState, dispatch] = useContext(StoreContext);
	const [cid, setCid] = useState(null);

	useEffect(() => {
		async function check() {
			try {
				const res = await appState.pinataService.fetchVideo(pullRequestId);
				console.log(res);
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
		<div>
			<Head>
				<title>EthBerlin 2022</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>VidQ</h1>
				<div></div>
				<UploadFile pullRequestId={pullRequestId} />
				<VideoPlayer cid={cid} />
			</main>
		</div>
	);
}