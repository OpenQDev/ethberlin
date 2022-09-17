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
			<div className="flex flex-col items-center p-8">
				{cid ? <VideoPlayer cid={cid} /> : <UploadFile pullRequestId={pullRequestId} />}
				<div className="flex w-[960px]">
				Some great info about this Pull Request.
				</div>
			</div>
		</div>
	);
}
